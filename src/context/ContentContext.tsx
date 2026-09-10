"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  siteConfig as defaultSiteConfig,
  services as defaultServices,
  defaultClients,
  defaultTasks,
  defaultEmployees,
  defaultPayments,
  defaultExpenses,
  defaultSalaries,
  defaultActivityLogs,
  SiteConfig,
  ServiceItem,
  ClientRecord,
  TaskRecord,
  EmployeeRecord,
  PaymentRecord,
  ExpenseRecord,
  SalaryRecord,
  ActivityLog,
} from "@/data/content";

interface ContentContextType {
  siteConfig: SiteConfig;
  services: ServiceItem[];
  locale: "en" | "bn";
  setLocale: (locale: "en" | "bn") => void;
  updateSiteConfig: (newConfig: Partial<SiteConfig>) => void;
  addService: (newService: ServiceItem) => void;
  updateService: (id: string, updatedService: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  moveService: (id: string, direction: "up" | "down") => void;
  resetToDefaults: () => void;
  exportData: () => string;
  importData: (jsonData: string) => boolean;
  accentColor: string;
  setAccentColor: (color: string) => void;

  // Operational ERP State & Handlers
  clients: ClientRecord[];
  tasks: TaskRecord[];
  employees: EmployeeRecord[];
  payments: PaymentRecord[];
  expenses: ExpenseRecord[];
  salaries: SalaryRecord[];
  activityLogs: ActivityLog[];

  addClient: (client: Omit<ClientRecord, "id" | "date"> & { date?: string }) => void;
  updateClient: (id: string, fields: Partial<ClientRecord>) => void;
  deleteClient: (id: string) => void;

  addTask: (task: Omit<TaskRecord, "id">) => void;
  updateTask: (id: string, fields: Partial<TaskRecord>) => void;
  deleteTask: (id: string) => void;
  toggleTaskStage: (
    taskId: string,
    stageIndex: number,
    actingRole: string,
    actorName: string
  ) => { success: boolean; message: string };

  addEmployee: (employee: Omit<EmployeeRecord, "id">) => void;
  updateEmployee: (id: string, fields: Partial<EmployeeRecord>) => void;
  deleteEmployee: (id: string) => void;

  addPayment: (payment: Omit<PaymentRecord, "id" | "date"> & { date?: string }) => void;
  addExpense: (expense: Omit<ExpenseRecord, "id" | "date"> & { date?: string }) => void;
  addSalary: (salary: Omit<SalaryRecord, "id">) => void;
  markSalaryPaid: (id: string) => void;

  addActivityLog: (log: Omit<ActivityLog, "id" | "time">) => void;
  addLeadFromContactForm: (leadData: {
    name: string;
    phone: string;
    email?: string;
    serviceId: string;
    serviceName: string;
    message?: string;
  }) => void;
}

const STORAGE_KEY_CONFIG = "thumbstop_site_config_v2";
const STORAGE_KEY_SERVICES = "thumbstop_services_v2";
const STORAGE_KEY_ACCENT = "thumbstop_accent_color_v2";
const STORAGE_KEY_LOCALE = "thumbstop_locale_v2";
const STORAGE_KEY_CLIENTS = "thumbstop_erp_clients_v2";
const STORAGE_KEY_TASKS = "thumbstop_erp_tasks_v2";
const STORAGE_KEY_EMPLOYEES = "thumbstop_erp_employees_v2";
const STORAGE_KEY_PAYMENTS = "thumbstop_erp_payments_v2";
const STORAGE_KEY_EXPENSES = "thumbstop_erp_expenses_v2";
const STORAGE_KEY_SALARIES = "thumbstop_erp_salaries_v2";
const STORAGE_KEY_LOGS = "thumbstop_erp_logs_v2";

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(defaultSiteConfig);
  const [services, setServices] = useState<ServiceItem[]>(defaultServices);
  const [accentColor, setAccentColorState] = useState<string>("#1FA8CB");
  const [locale, setLocaleState] = useState<"en" | "bn">("en");

  // Operational state
  const [clients, setClients] = useState<ClientRecord[]>(defaultClients);
  const [tasks, setTasks] = useState<TaskRecord[]>(defaultTasks);
  const [employees, setEmployees] = useState<EmployeeRecord[]>(defaultEmployees);
  const [payments, setPayments] = useState<PaymentRecord[]>(defaultPayments);
  const [expenses, setExpenses] = useState<ExpenseRecord[]>(defaultExpenses);
  const [salaries, setSalaries] = useState<SalaryRecord[]>(defaultSalaries);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(defaultActivityLogs);

  // Load from localStorage on client mount (deferred via microtask to prevent cascading renders)
  useEffect(() => {
    queueMicrotask(() => {
      try {
        const savedConfig = localStorage.getItem(STORAGE_KEY_CONFIG);
        if (savedConfig) setSiteConfig(JSON.parse(savedConfig));

        const savedServices = localStorage.getItem(STORAGE_KEY_SERVICES);
        if (savedServices) setServices(JSON.parse(savedServices));

        const savedAccent = localStorage.getItem(STORAGE_KEY_ACCENT);
        if (savedAccent) setAccentColorState(savedAccent);

        const savedLocale = localStorage.getItem(STORAGE_KEY_LOCALE) as "en" | "bn" | null;
        if (savedLocale === "en" || savedLocale === "bn") setLocaleState(savedLocale);

        const savedClients = localStorage.getItem(STORAGE_KEY_CLIENTS);
        if (savedClients) setClients(JSON.parse(savedClients));

        const savedTasks = localStorage.getItem(STORAGE_KEY_TASKS);
        if (savedTasks) setTasks(JSON.parse(savedTasks));

        const savedEmployees = localStorage.getItem(STORAGE_KEY_EMPLOYEES);
        if (savedEmployees) {
          try {
            const parsed = JSON.parse(savedEmployees);
            const merged = parsed.map((emp: EmployeeRecord) => {
              const def = defaultEmployees.find((d) => d.id === emp.id);
              return {
                ...emp,
                username: emp.username || def?.username || emp.name.toLowerCase().replace(/[^a-z0-9]/g, "_"),
                password: emp.password || def?.password || "staff2026",
                joinDate: emp.joinDate || def?.joinDate || "01 Jan 2024",
              };
            });
            setEmployees(merged);
          } catch {
            setEmployees(defaultEmployees);
          }
        }

        const savedPayments = localStorage.getItem(STORAGE_KEY_PAYMENTS);
        if (savedPayments) setPayments(JSON.parse(savedPayments));

        const savedExpenses = localStorage.getItem(STORAGE_KEY_EXPENSES);
        if (savedExpenses) setExpenses(JSON.parse(savedExpenses));

        const savedSalaries = localStorage.getItem(STORAGE_KEY_SALARIES);
        if (savedSalaries) setSalaries(JSON.parse(savedSalaries));

        const savedLogs = localStorage.getItem(STORAGE_KEY_LOGS);
        if (savedLogs) setActivityLogs(JSON.parse(savedLogs));
      } catch (err) {
        console.warn("Could not load stored content from localStorage", err);
      }
    });
  }, []);

  const setLocale = (newLocale: "en" | "bn") => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY_LOCALE, newLocale);
    } catch (e) {
      console.error(e);
    }
  };

  // Update siteConfig and persist
  const updateSiteConfig = (newConfig: Partial<SiteConfig>) => {
    setSiteConfig((prev) => {
      const updated = { ...prev, ...newConfig };
      try {
        localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Service CRUD
  const addService = (newService: ServiceItem) => {
    setServices((prev) => {
      const updated = [...prev, newService];
      try {
        localStorage.setItem(STORAGE_KEY_SERVICES, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const updateService = (id: string, updatedFields: Partial<ServiceItem>) => {
    setServices((prev) => {
      const updated = prev.map((s) =>
        s.id === id ? { ...s, ...updatedFields } : s
      );
      try {
        localStorage.setItem(STORAGE_KEY_SERVICES, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const deleteService = (id: string) => {
    setServices((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY_SERVICES, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const moveService = (id: string, direction: "up" | "down") => {
    setServices((prev) => {
      const index = prev.findIndex((s) => s.id === id);
      if (index === -1) return prev;
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= prev.length) return prev;
      const updated = [...prev];
      const [movedItem] = updated.splice(index, 1);
      updated.splice(targetIndex, 0, movedItem);
      try {
        localStorage.setItem(STORAGE_KEY_SERVICES, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const setAccentColor = (color: string) => {
    setAccentColorState(color);
    try {
      localStorage.setItem(STORAGE_KEY_ACCENT, color);
    } catch (e) {
      console.error(e);
    }
  };

  // ----------------------------------------------------------------------------
  // Operational ERP Actions
  // ----------------------------------------------------------------------------
  const addActivityLog = (log: Omit<ActivityLog, "id" | "time">) => {
    const newLog: ActivityLog = {
      id: `act-${Date.now()}`,
      time: "Just now",
      user: log.user || "System",
      action: log.action,
      module: log.module,
      type: log.type || "lead",
    };
    setActivityLogs((prev) => {
      const updated = [newLog, ...prev.slice(0, 49)];
      try {
        localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const addClient = (clientData: Omit<ClientRecord, "id" | "date"> & { date?: string }) => {
    const newClient: ClientRecord = {
      ...clientData,
      id: `cli-${Date.now().toString().slice(-4)}`,
      date: clientData.date || new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    };
    setClients((prev) => {
      const updated = [newClient, ...prev];
      try {
        localStorage.setItem(STORAGE_KEY_CLIENTS, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
    addActivityLog({
      user: "Abu Tawfiq",
      action: `Added new client ${newClient.name} (${newClient.serviceName})`,
      module: "Clients",
      type: "client",
    });
  };

  const updateClient = (id: string, fields: Partial<ClientRecord>) => {
    setClients((prev) => {
      const updated = prev.map((c) => (c.id === id ? { ...c, ...fields } : c));
      try {
        localStorage.setItem(STORAGE_KEY_CLIENTS, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const deleteClient = (id: string) => {
    setClients((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY_CLIENTS, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const addTask = (taskData: Omit<TaskRecord, "id">) => {
    const newTask: TaskRecord = {
      ...taskData,
      id: `tsk-${Date.now().toString().slice(-4)}`,
    };
    setTasks((prev) => {
      const updated = [newTask, ...prev];
      try {
        localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
    addActivityLog({
      user: "Abu Tawfiq",
      action: `Created task "${newTask.title}" for ${newTask.clientName}`,
      module: "Tasks",
      type: "task",
    });
  };

  const updateTask = (id: string, fields: Partial<TaskRecord>) => {
    setTasks((prev) => {
      const updated = prev.map((t) => (t.id === id ? { ...t, ...fields } : t));
      try {
        localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => {
      const updated = prev.filter((t) => t.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const toggleTaskStage = (
    taskId: string,
    stageIndex: number,
    actingRole: string,
    actorName: string
  ): { success: boolean; message: string } => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task || !task.stages) return { success: false, message: "Task or stages not found." };

    const stage = task.stages[stageIndex];
    if (!stage) return { success: false, message: "Stage milestone not found." };

    // Role verification: Super Admin can do everything. Otherwise must match stage assignedRole.
    const isSuperAdmin = actingRole === "super_admin" || actingRole === "admin";
    const canComplete =
      isSuperAdmin ||
      !stage.assignedRole ||
      stage.assignedRole === "all" ||
      stage.assignedRole === actingRole;

    if (!canComplete) {
      const readableRole =
        stage.assignedRole === "editor"
          ? "Video Editor"
          : stage.assignedRole === "uploader"
          ? "Uploader / Publisher"
          : stage.assignedRole === "designer"
          ? "Graphic Designer"
          : stage.assignedRole === "developer"
          ? "Full-Stack Dev"
          : stage.assignedRole;
      return {
        success: false,
        message: `Action Restricted: Stage "${stage.name}" can only be completed by ${readableRole} or Super Admin.`,
      };
    }

    const willBeDone = !stage.isDone;
    const updatedStages = task.stages.map((stg, i) => {
      if (i === stageIndex) {
        return {
          ...stg,
          isDone: willBeDone,
          completedBy: willBeDone ? actorName : undefined,
          completedAt: willBeDone
            ? new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
            : undefined,
        };
      }
      return stg;
    });

    const doneCount = updatedStages.filter((s) => s.isDone).length;
    const newProgress = Math.round((doneCount / updatedStages.length) * 100);
    const newStatus = newProgress === 100 ? ("completed" as const) : ("in_progress" as const);

    const updatedTask: TaskRecord = {
      ...task,
      stages: updatedStages,
      progress: newProgress,
      status: newStatus,
    };

    setTasks((prev) => {
      const updated = prev.map((t) => (t.id === taskId ? updatedTask : t));
      try {
        localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });

    // Sync client progress if linked
    if (task.clientId) {
      setClients((prev) => {
        const updated = prev.map((c) =>
          c.id === task.clientId
            ? {
                ...c,
                progress: newProgress,
                status: newProgress === 100 ? ("completed" as const) : ("active" as const),
              }
            : c
        );
        try {
          localStorage.setItem(STORAGE_KEY_CLIENTS, JSON.stringify(updated));
        } catch (e) {
          console.error(e);
        }
        return updated;
      });
    }

    addActivityLog({
      user: actorName,
      action: willBeDone
        ? `Marked stage "${stage.name}" COMPLETED for ${task.clientName}`
        : `Reopened stage "${stage.name}" for ${task.clientName}`,
      module: "Tasks",
      type: "task",
    });

    return {
      success: true,
      message: willBeDone
        ? `Stage "${stage.name}" marked complete by ${actorName}!`
        : `Stage "${stage.name}" reopened.`,
    };
  };

  const addEmployee = (empData: Omit<EmployeeRecord, "id">) => {
    const newEmp: EmployeeRecord = {
      ...empData,
      id: `emp-${Date.now().toString().slice(-4)}`,
    };
    setEmployees((prev) => {
      const updated = [...prev, newEmp];
      try {
        localStorage.setItem(STORAGE_KEY_EMPLOYEES, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
    addActivityLog({
      user: "Abu Tawfiq",
      action: `Onboarded employee ${newEmp.name} as ${newEmp.role}`,
      module: "Employees",
      type: "client",
    });
  };

  const updateEmployee = (id: string, fields: Partial<EmployeeRecord>) => {
    setEmployees((prev) => {
      const updated = prev.map((e) => (e.id === id ? { ...e, ...fields } : e));
      try {
        localStorage.setItem(STORAGE_KEY_EMPLOYEES, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const deleteEmployee = (id: string) => {
    setEmployees((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY_EMPLOYEES, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const addPayment = (paymentData: Omit<PaymentRecord, "id" | "date"> & { date?: string }) => {
    const newPay: PaymentRecord = {
      ...paymentData,
      id: `pay-${Date.now().toString().slice(-4)}`,
      date: paymentData.date || new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    };
    setPayments((prev) => {
      const updated = [newPay, ...prev];
      try {
        localStorage.setItem(STORAGE_KEY_PAYMENTS, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
    addActivityLog({
      user: "Finance Officer",
      action: `Payment of ৳${newPay.amount.toLocaleString()} received via ${newPay.method} from ${newPay.clientName}`,
      module: "Finance",
      type: "payment",
    });
  };

  const addExpense = (expData: Omit<ExpenseRecord, "id" | "date"> & { date?: string }) => {
    const newExp: ExpenseRecord = {
      ...expData,
      id: `exp-${Date.now().toString().slice(-4)}`,
      date: expData.date || new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    };
    setExpenses((prev) => {
      const updated = [newExp, ...prev];
      try {
        localStorage.setItem(STORAGE_KEY_EXPENSES, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
    addActivityLog({
      user: "Finance Officer",
      action: `Expense ৳${newExp.amount.toLocaleString()} recorded for ${newExp.description}`,
      module: "Finance",
      type: "expense",
    });
  };

  const addSalary = (salData: Omit<SalaryRecord, "id">) => {
    const newSal: SalaryRecord = {
      ...salData,
      id: `sal-${Date.now().toString().slice(-4)}`,
    };
    setSalaries((prev) => {
      const updated = [newSal, ...prev];
      try {
        localStorage.setItem(STORAGE_KEY_SALARIES, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const markSalaryPaid = (id: string) => {
    setSalaries((prev) => {
      const updated = prev.map((s) => (s.id === id ? { ...s, status: "Paid" as const } : s));
      try {
        localStorage.setItem(STORAGE_KEY_SALARIES, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Connect Front-end Contact Form to Back-end Leads
  const addLeadFromContactForm = (leadData: {
    name: string;
    phone: string;
    email?: string;
    serviceId: string;
    serviceName: string;
    message?: string;
  }) => {
    const newLeadClient: ClientRecord = {
      id: `lead-${Date.now().toString().slice(-4)}`,
      name: leadData.name,
      company: "Web Lead (Contact Form)",
      serviceId: leadData.serviceId,
      serviceName: leadData.serviceName,
      phone: leadData.phone,
      whatsapp: leadData.phone,
      paymentMethod: "bKash",
      totalAmount: 25000,
      paidAmount: 0,
      dueAmount: 25000,
      progress: 5,
      status: "pending",
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      isLead: true,
      notes: leadData.message ? `Message: ${leadData.message}` : "Submitted via Website Contact Form",
    };

    setClients((prev) => {
      const updated = [newLeadClient, ...prev];
      try {
        localStorage.setItem(STORAGE_KEY_CLIENTS, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });

    addActivityLog({
      user: "Website Visitor",
      action: `New lead from ${leadData.name} for "${leadData.serviceName}" via Contact Form`,
      module: "Leads",
      type: "lead",
    });
  };

  // Reset to original ThumbStop content
  const resetToDefaults = () => {
    setSiteConfig(defaultSiteConfig);
    setServices(defaultServices);
    setAccentColorState("#1FA8CB");
    setClients(defaultClients);
    setTasks(defaultTasks);
    setEmployees(defaultEmployees);
    setPayments(defaultPayments);
    setExpenses(defaultExpenses);
    setSalaries(defaultSalaries);
    setActivityLogs(defaultActivityLogs);
    try {
      localStorage.clear();
    } catch (e) {
      console.error(e);
    }
  };

  // Export all content as JSON
  const exportData = () => {
    return JSON.stringify(
      {
        siteConfig,
        services,
        clients,
        tasks,
        employees,
        payments,
        expenses,
        salaries,
        activityLogs,
        accentColor,
        exportedAt: new Date().toISOString(),
      },
      null,
      2
    );
  };

  // Import JSON content
  const importData = (jsonData: string) => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.siteConfig && parsed.services) {
        setSiteConfig(parsed.siteConfig);
        setServices(parsed.services);
        if (parsed.clients) setClients(parsed.clients);
        if (parsed.tasks) setTasks(parsed.tasks);
        if (parsed.employees) setEmployees(parsed.employees);
        if (parsed.payments) setPayments(parsed.payments);
        if (parsed.expenses) setExpenses(parsed.expenses);
        if (parsed.salaries) setSalaries(parsed.salaries);
        if (parsed.accentColor) setAccentColorState(parsed.accentColor);

        localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(parsed.siteConfig));
        localStorage.setItem(STORAGE_KEY_SERVICES, JSON.stringify(parsed.services));
        if (parsed.clients) localStorage.setItem(STORAGE_KEY_CLIENTS, JSON.stringify(parsed.clients));
        if (parsed.tasks) localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(parsed.tasks));
        if (parsed.payments) localStorage.setItem(STORAGE_KEY_PAYMENTS, JSON.stringify(parsed.payments));
        return true;
      }
      return false;
    } catch (e) {
      console.error("Invalid JSON import", e);
      return false;
    }
  };

  return (
    <ContentContext.Provider
      value={{
        siteConfig,
        services,
        locale,
        setLocale,
        updateSiteConfig,
        addService,
        updateService,
        deleteService,
        moveService,
        resetToDefaults,
        exportData,
        importData,
        accentColor,
        setAccentColor,
        clients,
        tasks,
        employees,
        payments,
        expenses,
        salaries,
        activityLogs,
        addClient,
        updateClient,
        deleteClient,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskStage,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        addPayment,
        addExpense,
        addSalary,
        markSalaryPaid,
        addActivityLog,
        addLeadFromContactForm,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
}
