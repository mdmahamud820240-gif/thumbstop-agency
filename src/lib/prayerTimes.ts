/**
 * Bangladesh (Asia/Dhaka) Prayer Times Calculation Engine
 * 
 * Accurately computes the daily 5 prayer times (Fajr, Dhuhr, Asr, Maghrib, Isha)
 * specifically for Bangladesh using standard astronomical solar equations
 * calibrated to Dhaka (Latitude: 23.8103° N, Longitude: 90.4125° E, UTC+6).
 * 
 * Follows Islamic Foundation Bangladesh / University of Islamic Sciences Karachi standards:
 * - Fajr angle: 18.0°
 * - Isha angle: 18.0°
 * - Asr shadow factor: 2 (Hanafi juristic standard common across Bangladesh)
 * - Dhuhr: Solar noon + 2 minute buffer for safety
 * - Maghrib: Sunset + 2 minute buffer
 */

export interface PrayerItem {
  id: "fajr" | "dhuhr" | "asr" | "maghrib" | "isha";
  nameBn: string;
  nameEn: string;
  time24: string;      // "HH:mm"
  time12: string;      // "hh:mm AM/PM"
  timestamp: number;   // Epoch ms on the target date
  arabicName: string;
  isPassed: boolean;
  isNext?: boolean;
}

export interface PrayerSchedule {
  dateStr: string;     // e.g. "04 Sep 2026"
  dateBn: string;      // e.g. "৪ সেপ্টেম্বর ২০২৬"
  prayers: PrayerItem[];
  currentPrayer: PrayerItem | null;
  nextPrayer: PrayerItem;
  minutesRemaining: number;
  timeRemainingFormatted: string;
}

// Astronomical helper formulas
function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180.0;
}

function toDegrees(radians: number): number {
  return (radians * 180.0) / Math.PI;
}

/**
 * Calculates day of year (1-366)
 */
function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

/**
 * Calculates Sun's Declination and Equation of Time
 */
function getSunPosition(dayOfYear: number): { declination: number; equationOfTime: number } {
  // Fractional year in radians
  const gamma = (2 * Math.PI / 365) * (dayOfYear - 1);
  
  // Equation of time in minutes
  const eqTime = 229.18 * (
    0.000075 +
    0.001868 * Math.cos(gamma) -
    0.032077 * Math.sin(gamma) -
    0.014615 * Math.cos(2 * gamma) -
    0.040849 * Math.sin(2 * gamma)
  );

  // Solar declination in degrees
  const decl = 0.006918 -
    0.399912 * Math.cos(gamma) +
    0.070257 * Math.sin(gamma) -
    0.006758 * Math.cos(2 * gamma) +
    0.000907 * Math.sin(2 * gamma) -
    0.002697 * Math.cos(3 * gamma) +
    0.00148 * Math.sin(3 * gamma);

  return {
    declination: toDegrees(decl),
    equationOfTime: eqTime,
  };
}

/**
 * Hour angle for a given solar altitude angle
 */
function getHourAngle(lat: number, decl: number, angle: number, isMorning: boolean): number {
  const radLat = toRadians(lat);
  const radDecl = toRadians(decl);
  const radAngle = toRadians(angle);

  const cosH = (Math.sin(radAngle) - Math.sin(radLat) * Math.sin(radDecl)) /
               (Math.cos(radLat) * Math.cos(radDecl));

  if (cosH > 1) return 0;   // Sun never rises to this angle
  if (cosH < -1) return 180; // Sun never dips below this angle

  const h = toDegrees(Math.acos(cosH));
  return isMorning ? -h : h;
}

/**
 * Hour angle for Asr prayer based on shadow factor
 * Bangladesh Islamic Foundation commonly uses Hanafi shadow length ratio = 2
 */
function getAsrHourAngle(lat: number, decl: number, shadowFactor = 2): number {
  const diff = Math.abs(lat - decl);
  const noonSunAltitude = 90 - diff;
  const noonSunAltRad = toRadians(noonSunAltitude);
  const noonShadow = 1 / Math.tan(noonSunAltRad);
  const asrShadow = noonShadow + shadowFactor;
  const asrAltitude = toDegrees(Math.atan(1 / asrShadow));

  return getHourAngle(lat, decl, asrAltitude, false);
}

function format12h(hours: number, minutes: number): string {
  const h = hours % 12 || 12;
  const m = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const ampm = hours >= 12 ? "PM" : "AM";
  return `${h < 10 ? `0${h}` : h}:${m} ${ampm}`;
}

function format24h(hours: number, minutes: number): string {
  const h = hours < 10 ? `0${hours}` : `${hours}`;
  const m = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${h}:${m}`;
}

/**
 * Returns current Date in Bangladesh (Asia/Dhaka)
 */
export function getDhakaNow(): Date {
  const now = new Date();
  const dhakaStr = now.toLocaleString("en-US", { timeZone: "Asia/Dhaka" });
  return new Date(dhakaStr);
}

/**
 * Calculates Bangladesh prayer times for any given date
 */
export function calculateBangladeshPrayerTimes(targetDate: Date = getDhakaNow()): PrayerSchedule {
  // Dhaka coordinates
  const LATITUDE = 23.8103;
  const LONGITUDE = 90.4125;
  const TIMEZONE_OFFSET = 6.0; // UTC+6

  const dayOfYear = getDayOfYear(targetDate);
  const { declination, equationOfTime } = getSunPosition(dayOfYear);

  // Solar noon in local hours
  // Solar Noon = 12 + (Timezone * 15 - Longitude) / 15 - EqTime / 60
  const solarNoonHours = 12 + (TIMEZONE_OFFSET * 15 - LONGITUDE) / 15 - equationOfTime / 60;

  // Fajr: Sun is 18° below horizon (-18°)
  const fajrHA = getHourAngle(LATITUDE, declination, -18.0, true);
  const fajrHours = solarNoonHours + fajrHA / 15;

  // Dhuhr: Solar noon + 2 min buffer
  const dhuhrHours = solarNoonHours + (2 / 60);

  // Asr: Hanafi standard (shadow ratio 2) + 2 min buffer
  const asrHA = getAsrHourAngle(LATITUDE, declination, 2);
  const asrHours = solarNoonHours + asrHA / 15 + (2 / 60);

  // Maghrib: Sun is 0.833° below horizon (accounting for refraction and sun diameter) + 2 min
  const maghribHA = getHourAngle(LATITUDE, declination, -0.833, false);
  const maghribHours = solarNoonHours + maghribHA / 15 + (2 / 60);

  // Isha: Sun is 18° below horizon (-18°)
  const ishaHA = getHourAngle(LATITUDE, declination, -18.0, false);
  const ishaHours = solarNoonHours + ishaHA / 15 + (2 / 60);

  function makePrayer(
    id: PrayerItem["id"],
    nameBn: string,
    nameEn: string,
    arabicName: string,
    decimalHours: number
  ): PrayerItem {
    const totalMinutes = Math.round(decimalHours * 60);
    const h = Math.floor(totalMinutes / 60) % 24;
    const m = totalMinutes % 60;

    const prayerDate = new Date(targetDate);
    prayerDate.setHours(h, m, 0, 0);

    return {
      id,
      nameBn,
      nameEn,
      arabicName,
      time24: format24h(h, m),
      time12: format12h(h, m),
      timestamp: prayerDate.getTime(),
      isPassed: prayerDate.getTime() <= targetDate.getTime(),
    };
  }

  const prayers: PrayerItem[] = [
    makePrayer("fajr", "ফজর", "Fajr", "الفجر", fajrHours),
    makePrayer("dhuhr", "জোহর", "Dhuhr", "الظهر", dhuhrHours),
    makePrayer("asr", "আসর", "Asr", "العصر", asrHours),
    makePrayer("maghrib", "মাগরিব", "Maghrib", "المغرب", maghribHours),
    makePrayer("isha", "এশা", "Isha", "العشاء", ishaHours),
  ];

  // Determine current and next prayer
  const nowMs = targetDate.getTime();
  let currentPrayer: PrayerItem | null = null;
  let nextPrayer: PrayerItem = prayers[0];

  for (let i = 0; i < prayers.length; i++) {
    const p = prayers[i];
    if (nowMs >= p.timestamp) {
      currentPrayer = p;
      // Next prayer is the one following this, or tomorrow's Fajr
      if (i < prayers.length - 1) {
        nextPrayer = prayers[i + 1];
      } else {
        // Next is tomorrow's Fajr
        const tomorrow = new Date(targetDate);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowSchedule = calculateBangladeshPrayerTimes(tomorrow);
        nextPrayer = tomorrowSchedule.prayers[0];
      }
    } else {
      nextPrayer = p;
      break;
    }
  }

  // Calculate minutes remaining
  const diffMs = nextPrayer.timestamp - nowMs;
  const totalMinRem = Math.max(0, Math.floor(diffMs / (1000 * 60)));

  let timeRemainingFormatted = "";
  if (totalMinRem >= 60) {
    const hoursRem = Math.floor(totalMinRem / 60);
    const minRem = totalMinRem % 60;
    timeRemainingFormatted = minRem > 0 
      ? `Starts in ${hoursRem}h ${minRem}m`
      : `Starts in ${hoursRem}h`;
  } else if (totalMinRem > 0) {
    timeRemainingFormatted = `Starts in ${totalMinRem} min`;
  } else {
    timeRemainingFormatted = "Now (এখন)";
  }

  // Date formatting
  const dateStr = targetDate.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });

  const bnNumbers: Record<string, string> = {
    "0": "০", "1": "১", "2": "২", "3": "৩", "4": "৪",
    "5": "৫", "6": "৬", "7": "৭", "8": "৮", "9": "৯"
  };

  const bnMonths = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
    "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
  ];
  const bnWeekdays = [
    "রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"
  ];

  const dayNum = targetDate.getDate();
  const dayBn = (dayNum < 10 ? `০${dayNum}` : String(dayNum)).replace(/[0-9]/g, (d) => bnNumbers[d] || d);
  const yearBn = String(targetDate.getFullYear()).replace(/[0-9]/g, (d) => bnNumbers[d] || d);
  const monthBn = bnMonths[targetDate.getMonth()];
  const weekdayBn = bnWeekdays[targetDate.getDay()];
  const dateBn = `${weekdayBn}, ${dayBn} ${monthBn} ${yearBn}`;

  return {
    dateStr,
    dateBn,
    prayers,
    currentPrayer,
    nextPrayer,
    minutesRemaining: totalMinRem,
    timeRemainingFormatted,
  };
}

/**
 * Checks if the current time matches any of today's Adhan times within the current minute
 * Returns the matching PrayerItem if it is exactly Adhan time now, otherwise null.
 */
export function checkCurrentAdhanTime(schedule = calculateBangladeshPrayerTimes(), overrideNow?: Date): PrayerItem | null {
  const now = overrideNow || getDhakaNow();
  const currentH = now.getHours();
  const currentM = now.getMinutes();
  const currentTime24 = `${currentH < 10 ? `0${currentH}` : currentH}:${currentM < 10 ? `0${currentM}` : currentM}`;

  for (const prayer of schedule.prayers) {
    if (prayer.time24 === currentTime24) {
      return prayer;
    }
  }

  return null;
}
