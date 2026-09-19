import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { C as Activity, S as Battery, _ as Ellipsis, a as Trash2, b as Check, c as Search, d as Menu, f as LayoutGrid, g as FileText, h as Folder, l as Plus, m as House, n as Wifi, o as Sparkles, p as Image, r as Video, s as Signal, t as X, u as MonitorSmartphone, v as Cloud, x as Bell, y as Clipboard } from "../_libs/lucide-react.mjs";
import { n as Slot } from "../_libs/@radix-ui/react-primitive+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as format, t as es } from "../_libs/date-fns.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/@radix-ui/react-switch+[...].mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DRPf7KNX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function uid(prefix = "id") {
	return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}
function capitalize(value) {
	if (!value) return value;
	return value.charAt(0).toUpperCase() + value.slice(1);
}
function LogoMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: cn("size-9", className),
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "32",
				height: "32",
				rx: "9",
				fill: "#0b1220"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M10 18.2c.7-3.4 3.5-5.7 6.8-5.7h3.1",
				fill: "none",
				stroke: "#f5f6f8",
				strokeWidth: "2.4",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M18.6 9.4 22.4 12.6 18.8 15.2",
				fill: "none",
				stroke: "#f5f6f8",
				strokeWidth: "2.4",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M22 13.8c-.7 3.4-3.5 5.7-6.8 5.7H12.1",
				fill: "none",
				stroke: "#f5f6f8",
				strokeWidth: "2.4",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M13.4 22.6 9.6 19.4 13.2 16.8",
				fill: "none",
				stroke: "#f5f6f8",
				strokeWidth: "2.4",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			})
		]
	});
}
function Wordmark({ stacked = false, inverted = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-center gap-2.5", stacked && "items-start"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, { className: "size-9 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "leading-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("text-[13px] font-semibold tracking-tight", inverted ? "text-sidebar-fg" : "text-fg"),
				children: "SYNC ENGINE"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("text-[11px]", inverted ? "text-sidebar-muted" : "text-muted"),
				children: "Controlar. Conectar. Avanzar."
			})]
		})]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[color,background-color,box-shadow,opacity,transform] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50 active:not-disabled:scale-[0.96] [&_svg]:pointer-events-none [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-fg shadow-sm hover:opacity-90",
			secondary: "bg-surface text-fg shadow-[var(--shadow-border)] hover:bg-primary-soft",
			soft: "bg-primary-soft text-primary hover:opacity-90",
			ghost: "text-muted hover:bg-primary-soft hover:text-fg",
			outline: "border border-border bg-surface text-fg hover:bg-primary-soft",
			sidebar: "text-sidebar-muted hover:bg-sidebar-fg/6 hover:text-sidebar-fg",
			danger: "bg-danger-soft text-danger hover:opacity-90"
		},
		size: {
			default: "h-11 rounded-[var(--radius-sm)] px-4 text-sm",
			sm: "h-9 rounded-[var(--radius-sm)] px-3 text-sm",
			lg: "h-12 rounded-[var(--radius-md)] px-5 text-sm",
			icon: "size-11 rounded-[var(--radius-sm)]",
			"icon-sm": "size-9 rounded-[var(--radius-sm)]",
			pill: "h-8 rounded-full px-3 text-xs"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-11 w-full rounded-[var(--radius-sm)] border border-border bg-surface px-3 text-sm text-fg shadow-none outline-none transition-[box-shadow,border-color] duration-[var(--motion-quick)] placeholder:text-subtle focus-visible:border-primary/40 focus-visible:ring-2 focus-visible:ring-ring/25", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-7 w-11 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors duration-[var(--motion-quick)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 data-[state=checked]:bg-primary data-[state=unchecked]:bg-border", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: "pointer-events-none block size-5 translate-x-0.5 rounded-full bg-surface shadow-sm transition-transform duration-[var(--motion-fast)] ease-[var(--ease-out)] data-[state=checked]:translate-x-[22px]" })
}));
Switch.displayName = "Switch";
function Ring({ value, size = 56, stroke = 6, className }) {
	const r = (size - stroke) / 2;
	const c = 2 * Math.PI * r;
	const offset = c - Math.min(100, Math.max(0, value)) / 100 * c;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: size,
		height: size,
		viewBox: `0 0 ${size} ${size}`,
		className: cn("-rotate-90", className),
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: size / 2,
			cy: size / 2,
			r,
			fill: "none",
			className: "stroke-border",
			strokeWidth: stroke
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: size / 2,
			cy: size / 2,
			r,
			fill: "none",
			className: "stroke-ok",
			strokeWidth: stroke,
			strokeDasharray: c,
			strokeDashoffset: offset,
			strokeLinecap: "round"
		})]
	});
}
function SparkBars({ values, className, accentLast = true }) {
	const max = Math.max(...values, 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex h-10 items-end gap-1", className),
		children: values.map((value, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("w-1.5 rounded-full", accentLast && index === values.length - 1 ? "bg-primary" : "bg-border"),
			style: { height: `${Math.max(12, value / max * 100)}%` }
		}, `${value}-${index}`))
	});
}
function SparkLine({ values, className }) {
	const max = Math.max(...values);
	const min = Math.min(...values);
	const w = 120;
	const h = 40;
	const pts = values.map((value, index) => {
		return `${index / Math.max(values.length - 1, 1) * w},${h - (value - min) / Math.max(max - min, 1) * 36 - 2}`;
	}).join(" ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: `0 0 ${w} ${h}`,
		className: cn("h-10 w-full", className),
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
			points: pts,
			className: "stroke-primary",
			strokeWidth: "2.2",
			strokeLinejoin: "round",
			strokeLinecap: "round"
		})
	});
}
function UsageMeter({ parts }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-2 overflow-hidden rounded-full bg-sidebar-line",
			children: parts.map((part) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "h-full",
				style: {
					width: `${part.value}%`,
					background: part.color
				}
			}, part.label))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-sidebar-muted",
			children: parts.map((part) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "size-1.5 rounded-full",
						style: { background: part.color }
					}),
					part.label,
					" ",
					part.value,
					"%"
				]
			}, part.label))
		})]
	});
}
var WALLPAPERS = [
	{
		id: "silk",
		src: "/media/silk-tall.jpg",
		label: "Seda"
	},
	{
		id: "mist",
		src: "/media/wall-mist.jpg",
		label: "Niebla"
	},
	{
		id: "leaves",
		src: "/media/wall-leaves.jpg",
		label: "Hojas"
	},
	{
		id: "dunes",
		src: "/media/wall-dunes.jpg",
		label: "Dunas"
	},
	{
		id: "linen",
		src: "/media/wall-linen.jpg",
		label: "Lino"
	}
];
var NAV = [
	{
		id: "home",
		label: "Inicio"
	},
	{
		id: "devices",
		label: "Dispositivos"
	},
	{
		id: "activity",
		label: "Actividad"
	},
	{
		id: "files",
		label: "Archivos"
	},
	{
		id: "ai",
		label: "IA Assist"
	},
	{
		id: "automations",
		label: "Automatizaciones",
		desktop: true
	},
	{
		id: "widgets",
		label: "Widgets",
		desktop: true
	},
	{
		id: "settings",
		label: "Ajustes",
		desktop: true
	}
];
var MOBILE_TABS = [
	"home",
	"devices",
	"activity",
	"files",
	"ai"
];
function seedDevices() {
	return [
		{
			id: "xiaomi-2312",
			name: "Xiaomi 2312",
			kind: "laptop",
			os: "Windows 11",
			platform: "Windows",
			status: "online",
			latencyMs: 12,
			lastSeenLabel: "Este dispositivo",
			image: "/media/device-laptop.jpg",
			current: true
		},
		{
			id: "galaxy-s24",
			name: "Galaxy S24",
			kind: "phone",
			os: "Android 14",
			platform: "Android",
			status: "online",
			latencyMs: 28,
			lastSeenLabel: "Hace un momento",
			image: "/media/device-phone.jpg"
		},
		{
			id: "ipad-pro",
			name: "iPad Pro",
			kind: "tablet",
			os: "iPadOS 17",
			platform: "Apple",
			status: "offline",
			latencyMs: null,
			lastSeenLabel: "Hace 3 h",
			image: "/media/device-tablet.jpg"
		},
		{
			id: "oficina-desktop",
			name: "Oficina · Desktop",
			kind: "desktop",
			os: "Windows 11",
			platform: "Windows",
			status: "online",
			latencyMs: 16,
			lastSeenLabel: "En la oficina",
			image: "/media/device-desktop.jpg"
		}
	];
}
function seedActivity() {
	return [
		{
			id: "a1",
			title: "Mensaje enviado al portapapeles",
			detail: "Xiaomi 2312",
			kind: "clipboard",
			minutesAgo: 2
		},
		{
			id: "a2",
			title: "Resumen generado con IA",
			detail: "Notas de reunión",
			kind: "ai",
			minutesAgo: 12
		},
		{
			id: "a3",
			title: "Dispositivo conectado",
			detail: "Galaxy S24",
			kind: "device",
			minutesAgo: 28
		},
		{
			id: "a4",
			title: "Archivo sincronizado",
			detail: "Presentación_v3.pptx",
			kind: "file",
			minutesAgo: 60
		},
		{
			id: "a5",
			title: "Regla de automatización ejecutada",
			detail: "Backup diario",
			kind: "automation",
			minutesAgo: 180
		}
	];
}
function seedFiles() {
	return [
		{
			id: "f1",
			name: "Presentación_v3.pptx",
			kind: "doc",
			size: "18 MB",
			device: "Xiaomi 2312",
			minutesAgo: 60
		},
		{
			id: "f2",
			name: "Notas de reunión.md",
			kind: "doc",
			size: "24 KB",
			device: "Xiaomi 2312",
			minutesAgo: 12
		},
		{
			id: "f3",
			name: "Malecón-dron.mov",
			kind: "video",
			size: "240 MB",
			device: "Galaxy S24",
			minutesAgo: 90
		},
		{
			id: "f4",
			name: "Mockups-widgets.png",
			kind: "image",
			size: "4.2 MB",
			device: "iPad Pro",
			minutesAgo: 200
		},
		{
			id: "f5",
			name: "Backup diario.zip",
			kind: "other",
			size: "816 MB",
			device: "Oficina · Desktop",
			minutesAgo: 180
		}
	];
}
function seedAutomations() {
	return [
		{
			id: "r1",
			name: "Portapapeles universal",
			when: "Al copiar texto",
			action: "Enviar a todos los dispositivos",
			enabled: true
		},
		{
			id: "r2",
			name: "Aviso de desconexión",
			when: "Si un dispositivo se desconecta",
			action: "Notificar en el actual",
			enabled: true
		},
		{
			id: "r3",
			name: "Backup nocturno",
			when: "Cada día a las 03:00",
			action: "Copiar cambios al escritorio",
			enabled: true
		},
		{
			id: "r4",
			name: "Foco en reuniones",
			when: "Si el calendario marca ocupado",
			action: "Silenciar avisos no urgentes",
			enabled: false
		}
	];
}
var EVENT_BARS = [
	4,
	6,
	5,
	8,
	7,
	9,
	11
];
var FILE_SPARK = [
	12,
	14,
	13,
	18,
	16,
	21,
	19,
	24,
	22,
	28,
	26,
	31
];
var LATENCY_SPARK = [
	18,
	16,
	14,
	15,
	13,
	12,
	14,
	11,
	12,
	10,
	12,
	12
];
var USAGE_BREAKDOWN = [
	{
		label: "Documentos",
		value: 42,
		color: "var(--color-primary)"
	},
	{
		label: "Imágenes",
		value: 28,
		color: "var(--color-ok)"
	},
	{
		label: "Vídeos",
		value: 20,
		color: "var(--color-warn)"
	},
	{
		label: "Otros",
		value: 10,
		color: "#64748b"
	}
];
function kindLabel(kind) {
	switch (kind) {
		case "laptop": return "Portátil";
		case "phone": return "Móvil";
		case "tablet": return "Tablet";
		case "desktop": return "Escritorio";
	}
}
function relativeLabel(minutesAgo) {
	if (minutesAgo < 1) return "ahora";
	if (minutesAgo < 60) return `hace ${minutesAgo} min`;
	const hours = Math.round(minutesAgo / 60);
	if (hours < 24) return `hace ${hours} h`;
	return `hace ${Math.round(hours / 24)} d`;
}
var KIND_DEFAULTS = {
	laptop: {
		os: "Windows 11",
		platform: "Windows",
		image: "/media/device-laptop.jpg"
	},
	phone: {
		os: "Android 14",
		platform: "Android",
		image: "/media/device-phone.jpg"
	},
	tablet: {
		os: "iPadOS 17",
		platform: "Apple",
		image: "/media/device-tablet.jpg"
	},
	desktop: {
		os: "Windows 11",
		platform: "Windows",
		image: "/media/device-desktop.jpg"
	}
};
var initial = {
	displayName: "Jose",
	screen: "home",
	search: "",
	deviceFilter: "all",
	selectedDeviceId: "xiaomi-2312",
	devices: seedDevices(),
	activity: seedActivity(),
	files: seedFiles(),
	automations: seedAutomations(),
	health: 99.8,
	filesSynced: 1842,
	eventsToday: 24,
	usageMb: 816,
	syncing: false,
	lastSyncAt: Date.now() - 12e4,
	widget: {
		style: "dark",
		wallpaper: "/media/silk-tall.jpg",
		lock: true,
		stats: true,
		device: true,
		actions: true
	},
	notifyOpen: false
};
function pushActivity(list, item) {
	return [{
		...item,
		id: uid("act"),
		minutesAgo: 0
	}, ...list].slice(0, 20);
}
var useSyncStore = create()(persist((set, get) => ({
	...initial,
	setScreen: (screen) => set({
		screen,
		notifyOpen: false
	}),
	setSearch: (search) => set({ search }),
	setDeviceFilter: (deviceFilter) => set({ deviceFilter }),
	selectDevice: (selectedDeviceId) => set({ selectedDeviceId }),
	setName: (displayName) => set({ displayName }),
	setWidget: (patch) => set({ widget: {
		...get().widget,
		...patch
	} }),
	setNotifyOpen: (notifyOpen) => set({ notifyOpen }),
	toggleAutomation: (id) => set({ automations: get().automations.map((rule) => rule.id === id ? {
		...rule,
		enabled: !rule.enabled
	} : rule) }),
	addDevice: (name, kind) => {
		const defaults = KIND_DEFAULTS[kind];
		const device = {
			id: uid("dev"),
			name: name.trim() || `Nuevo ${kind}`,
			kind,
			os: defaults.os,
			platform: defaults.platform,
			status: "online",
			latencyMs: 18,
			lastSeenLabel: "Recién añadido",
			image: defaults.image
		};
		set({
			devices: [device, ...get().devices],
			selectedDeviceId: device.id,
			activity: pushActivity(get().activity, {
				title: "Dispositivo conectado",
				detail: device.name,
				kind: "device"
			})
		});
		toast.success(`${device.name} está en línea`);
	},
	removeDevice: (id) => {
		const current = get().devices.find((d) => d.id === id);
		set({
			devices: get().devices.filter((d) => d.id !== id),
			selectedDeviceId: get().selectedDeviceId === id ? get().devices.find((d) => d.id !== id)?.id ?? null : get().selectedDeviceId
		});
		if (current) toast(`${current.name} eliminado`);
	},
	copyClipboard: async () => {
		const text = "Notas de Sync Engine · listo para pegar en cualquier dispositivo";
		try {
			await navigator.clipboard.writeText(text);
		} catch {}
		set({
			activity: pushActivity(get().activity, {
				title: "Mensaje enviado al portapapeles",
				detail: "Xiaomi 2312",
				kind: "clipboard"
			}),
			eventsToday: get().eventsToday + 1
		});
		toast.success("Enviado a todos los dispositivos");
	},
	syncNow: () => {
		if (get().syncing) return;
		set({ syncing: true });
		window.setTimeout(() => {
			set({
				syncing: false,
				lastSyncAt: Date.now(),
				health: 99.8,
				filesSynced: get().filesSynced + 3,
				eventsToday: get().eventsToday + 1,
				devices: get().devices.map((device) => device.status === "online" ? {
					...device,
					latencyMs: 8 + Math.floor(Math.random() * 10),
					lastSeenLabel: device.current ? "Este dispositivo" : "Hace un momento"
				} : device),
				activity: pushActivity(get().activity, {
					title: "Sincronización completa",
					detail: "Xiaomi 2312 · 3 archivos",
					kind: "file"
				})
			});
			toast.success("Sincronización completa");
		}, 1100);
	},
	askAi: (prompt) => {
		set({
			screen: "ai",
			activity: pushActivity(get().activity, {
				title: "Resumen generado con IA",
				detail: prompt?.slice(0, 42) || "Estado de la flota",
				kind: "ai"
			})
		});
	},
	resetDemo: () => {
		set({
			...initial,
			lastSyncAt: Date.now()
		});
		toast("Demo restablecida");
	}
}), {
	name: "sync-engine-v1",
	partialize: (state) => ({
		displayName: state.displayName,
		devices: state.devices,
		automations: state.automations,
		widget: state.widget,
		health: state.health,
		filesSynced: state.filesSynced,
		eventsToday: state.eventsToday,
		usageMb: state.usageMb
	})
}));
function StatusDot({ online }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("inline-block size-2 rounded-full", online ? "bg-ok" : "bg-subtle") });
}
function DeviceHero({ compact = false }) {
	const device = useSyncStore((s) => s.devices.find((d) => d.current));
	const setScreen = useSyncStore((s) => s.setScreen);
	const selectDevice = useSyncStore((s) => s.selectDevice);
	if (!device) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "overflow-hidden rounded-[28px] bg-sidebar text-sidebar-fg shadow-[var(--shadow-border)]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("grid items-center gap-4 p-4 sm:p-5", compact ? "grid-cols-1" : "md:grid-cols-[1.1fr_0.9fr]"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium uppercase tracking-[0.16em] text-sidebar-muted",
					children: "Dispositivo actual"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex items-center gap-2 text-sm text-ok",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusDot, { online: true }), "Conectado"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 text-2xl font-semibold tracking-tight",
					children: device.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-sidebar-muted",
					children: [
						device.os,
						" · Wi-Fi · ",
						device.latencyMs,
						" ms de latencia"
					]
				}),
				!compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mt-4 h-9 rounded-full bg-sidebar-fg/10 px-4 text-sm font-medium text-sidebar-fg transition-colors duration-[var(--motion-quick)] hover:bg-sidebar-fg/16",
					onClick: () => {
						selectDevice(device.id);
						setScreen("devices");
					},
					children: "Ver detalles"
				}) : null
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: device.image,
				alt: device.name,
				className: "h-36 w-full rounded-2xl object-cover sm:h-40"
			})]
		})
	});
}
function StatCards() {
	const health = useSyncStore((s) => s.health);
	const eventsToday = useSyncStore((s) => s.eventsToday);
	const filesSynced = useSyncStore((s) => s.filesSynced);
	const cards = [
		{
			label: "Salud de sync",
			value: `${health.toFixed(1)}%`,
			hint: "Uptime saludable",
			extra: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ring, {
				value: health,
				size: 52,
				stroke: 5
			})
		},
		{
			label: "Actividad reciente",
			value: String(eventsToday),
			hint: "eventos hoy",
			extra: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SparkBars, {
				values: EVENT_BARS,
				className: "h-9 w-24"
			})
		},
		{
			label: "Archivos sincronizados",
			value: filesSynced.toLocaleString("es-PE"),
			hint: "este mes",
			extra: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SparkLine, {
				values: FILE_SPARK,
				className: "h-9 w-28"
			})
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3 sm:grid-cols-3",
		children: cards.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "flex items-center justify-between gap-3 rounded-[24px] bg-surface p-4 shadow-[var(--shadow-border)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium uppercase tracking-[0.12em] text-muted",
					children: card.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-3xl font-semibold tracking-tight tabular-nums",
					children: card.value
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted",
					children: card.hint
				})
			] }), card.extra]
		}, card.label))
	});
}
function QuickActions({ dense = false }) {
	const copyClipboard = useSyncStore((s) => s.copyClipboard);
	const syncNow = useSyncStore((s) => s.syncNow);
	const syncing = useSyncStore((s) => s.syncing);
	const askAi = useSyncStore((s) => s.askAi);
	const setScreen = useSyncStore((s) => s.setScreen);
	const actions = [
		{
			id: "clip",
			label: "Enviar al portapapeles",
			hint: "Entre dispositivos",
			icon: Folder,
			primary: true,
			onClick: () => void copyClipboard()
		},
		{
			id: "sync",
			label: syncing ? "Sincronizando…" : "Sincronizar ahora",
			hint: "Archivos pendientes",
			icon: Cloud,
			onClick: syncNow
		},
		{
			id: "ai",
			label: "Ask AI",
			hint: "Resumir / Analizar",
			icon: Sparkles,
			onClick: () => askAi("Resumir el estado de mis dispositivos")
		},
		{
			id: "auto",
			label: "Automatizaciones",
			hint: "Crear nueva regla",
			icon: LayoutGrid,
			onClick: () => setScreen("automations")
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("grid gap-3", dense ? "grid-cols-2" : "grid-cols-2"),
		children: actions.map((action) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: action.onClick,
			className: cn("flex min-h-24 flex-col items-start rounded-[22px] p-4 text-left shadow-[var(--shadow-border)] transition-[transform,box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-out)] active:scale-[0.98]", action.primary ? "bg-primary text-primary-fg" : "bg-surface text-fg hover:shadow-[var(--shadow-border-hover)]"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(action.icon, { className: "size-5" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-3 text-sm font-semibold",
					children: action.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("mt-0.5 text-xs", action.primary ? "text-primary-fg/80" : "text-muted"),
					children: action.hint
				})
			]
		}, action.id))
	});
}
var ACTIVITY_ICON = {
	clipboard: Clipboard,
	ai: Sparkles,
	device: Cloud,
	file: FileText,
	automation: LayoutGrid
};
function ActivityList({ items, limit }) {
	const visible = limit ? items.slice(0, limit) : items;
	if (visible.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "px-2 py-8 text-center text-sm text-muted",
		children: "No hay actividad todavía."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "divide-y divide-border",
		children: visible.map((item) => {
			const Icon = ACTIVITY_ICON[item.kind];
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center gap-3 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-10 items-center justify-center rounded-2xl bg-primary-soft text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-medium",
							children: item.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "truncate text-xs text-muted",
							children: [
								item.detail,
								" · ",
								relativeLabel(item.minutesAgo)
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "size-4 text-subtle" })
				]
			}, item.id);
		})
	});
}
function DeviceRow({ device, selected, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: onSelect,
		className: cn("flex w-full items-center gap-3 rounded-[22px] p-3 text-left transition-colors duration-[var(--motion-quick)]", selected ? "bg-primary-soft" : "hover:bg-bg"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: device.image,
			alt: "",
			className: "size-14 rounded-2xl object-cover"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-center gap-2 text-sm font-semibold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusDot, { online: device.status === "online" }), device.name]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-0.5 text-xs text-muted",
				children: [
					device.status === "online" ? "Conectado" : "Sin conexión",
					" · ",
					device.os,
					device.latencyMs != null ? ` · ${device.latencyMs} ms` : ` · ${device.lastSeenLabel}`
				]
			})]
		})]
	});
}
var FILE_ICON = {
	doc: FileText,
	image: Image,
	video: Video,
	other: Folder
};
function FileRow({ file }) {
	const Icon = FILE_ICON[file.kind];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex size-10 items-center justify-center rounded-2xl bg-primary-soft text-primary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "truncate text-sm font-medium",
				children: file.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted",
				children: [
					file.size,
					" · ",
					file.device,
					" · ",
					relativeLabel(file.minutesAgo)
				]
			})]
		})]
	});
}
function useNow(intervalMs = 1e3) {
	const [now, setNow] = (0, import_react.useState)(() => /* @__PURE__ */ new Date());
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => setNow(/* @__PURE__ */ new Date()), intervalMs);
		return () => window.clearInterval(id);
	}, [intervalMs]);
	return now;
}
function WidgetShell({ className, style, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("relative overflow-hidden rounded-[28px] p-4 text-left shadow-[var(--shadow-widget)]", style === "dark" ? "widget-glass text-widget-fg" : "widget-light text-fg shadow-[var(--shadow-border)]", className),
		children
	});
}
function StatsWidget({ style = "dark", className }) {
	const health = useSyncStore((s) => s.health);
	const eventsToday = useSyncStore((s) => s.eventsToday);
	const filesSynced = useSyncStore((s) => s.filesSynced);
	const current = useSyncStore((s) => s.devices.find((d) => d.current));
	const muted = style === "dark" ? "text-widget-muted" : "text-muted";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WidgetShell, {
		style,
		className: cn("w-full max-w-[340px]", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, { className: "size-7" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-semibold tracking-wide",
					children: "SYNC ENGINE"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: cn("flex items-center gap-1.5 text-[11px]", muted),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-ok" }), "En línea"]
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/media/device-laptop.jpg",
					alt: "",
					className: "h-9 w-14 rounded-lg object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-medium",
						children: current?.name ?? "Xiaomi 2312"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: cn("text-[10px]", muted),
						children: [current?.latencyMs ?? 12, " ms · Wi-Fi"]
					})]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-3 gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-sidebar-fg/6 p-2.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: cn("text-[10px]", muted),
							children: "Sync"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-lg font-semibold tabular-nums",
							children: [health.toFixed(1), "%"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ring, {
							value: health,
							size: 36,
							stroke: 4,
							className: "mt-1"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-sidebar-fg/6 p-2.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: cn("text-[10px]", muted),
							children: "Eventos hoy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-lg font-semibold tabular-nums",
							children: eventsToday
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SparkBars, {
							values: EVENT_BARS,
							className: "mt-2 h-7"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-sidebar-fg/6 p-2.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: cn("text-[10px]", muted),
							children: "Archivos"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-lg font-semibold tabular-nums",
							children: filesSynced.toLocaleString("es-PE")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SparkLine, {
							values: FILE_SPARK,
							className: "mt-1 h-7"
						})
					]
				})
			]
		})]
	});
}
function DeviceWidget({ style = "dark", className }) {
	const current = useSyncStore((s) => s.devices.find((d) => d.current));
	const muted = style === "dark" ? "text-widget-muted" : "text-muted";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WidgetShell, {
		style,
		className: cn("aspect-square w-[168px]", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-full flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, { className: "size-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] font-semibold tracking-wide",
						children: "SYNC ENGINE"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: cn("flex items-center gap-1 text-[10px]", muted),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-ok" }), "Conectado"]
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/media/device-laptop.jpg",
					alt: "",
					className: "mt-3 h-16 w-full rounded-xl object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: cn("mt-auto pt-2 text-[11px]", muted),
					children: [current?.latencyMs ?? 12, " ms"]
				})
			]
		})
	});
}
function ActionsWidget({ style = "dark", className, onAction }) {
	const muted = style === "dark" ? "text-widget-muted" : "text-muted";
	const items = [
		{
			id: "clipboard",
			label: "Enviar",
			icon: Folder
		},
		{
			id: "sync",
			label: "Sync",
			icon: Cloud
		},
		{
			id: "ai",
			label: "Ask AI",
			icon: Sparkles
		},
		{
			id: "automations",
			label: "Automatizar",
			icon: LayoutGrid
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WidgetShell, {
		style,
		className: cn("aspect-square w-[168px]", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid h-full grid-cols-2 gap-2",
			children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onAction?.(item.id),
				className: "flex flex-col items-center justify-center gap-1.5 rounded-2xl bg-sidebar-fg/6 transition-transform duration-[var(--motion-quick)] active:scale-[0.96]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("text-[10px] font-medium", muted),
					children: item.label
				})]
			}, item.id))
		})
	});
}
function LockWidget({ style = "dark", className }) {
	const now = useNow();
	const filesSynced = useSyncStore((s) => s.filesSynced);
	const muted = style === "dark" ? "text-widget-muted" : "text-muted";
	const date = capitalize(format(now, "EEEE, d 'de' MMMM", { locale: es }));
	const time = format(now, "H:mm");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WidgetShell, {
		style,
		className: cn("w-full max-w-[340px] bg-cover bg-center p-5", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("text-center text-sm", muted),
				children: date
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-center font-sans text-6xl font-semibold tracking-tight tabular-nums",
				children: time
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("mt-6 flex items-start gap-3 rounded-2xl p-3", style === "dark" ? "bg-sidebar-fg/8" : "bg-fg/5"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, { className: "size-8 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-semibold tracking-wide",
								children: "SYNC ENGINE"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: cn("text-[10px]", muted),
								children: "ahora"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 flex items-center gap-1.5 text-sm font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "inline-flex size-4 items-center justify-center rounded-full bg-ok text-primary-fg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
									className: "size-2.5",
									strokeWidth: 3
								})
							}), "Sincronización completa"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: cn("mt-0.5 text-[11px]", muted),
							children: [
								"Xiaomi 2312 · ",
								Math.min(filesSynced, 24),
								" archivos sincronizados"
							]
						})
					]
				})]
			})
		]
	});
}
function HealthHeroWidget({ style = "light", className }) {
	const health = useSyncStore((s) => s.health);
	const muted = style === "dark" ? "text-widget-muted" : "text-muted";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WidgetShell, {
		style,
		className: cn("p-6", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("text-xs font-medium uppercase tracking-[0.14em]", muted),
				children: "Salud de sync"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-6xl font-semibold tracking-tight tabular-nums",
					children: health.toFixed(1)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ring, {
					value: health,
					size: 72,
					stroke: 7
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-3 text-sm", muted),
				children: "Excelente · verificado ahora"
			})
		]
	});
}
function PhoneFrame({ children, wallpaper, className, lock = false }) {
	const now = useNow();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("relative mx-auto w-[280px] shrink-0 rounded-[42px] bg-sidebar p-[10px] shadow-[var(--shadow-widget)]", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden rounded-[32px] bg-sidebar",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: wallpaper,
					alt: "",
					className: "absolute inset-0 size-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-sidebar/25" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex h-[560px] flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between px-6 pt-3 text-[11px] font-medium text-widget-fg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums",
									children: format(now, "H:mm")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-1/2 top-2 h-6 w-24 -translate-x-1/2 rounded-full bg-sidebar" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Signal, { className: "size-3" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wifi, { className: "size-3" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Battery, { className: "size-3" })
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("flex flex-1 flex-col px-3 pb-4", lock && "justify-end"),
							children
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mb-2 h-1 w-28 rounded-full bg-widget-fg/70" })
					]
				})
			]
		})
	});
}
function matchesQuery(haystack, query) {
	return haystack.toLowerCase().includes(query.trim().toLowerCase());
}
function HomeScreen({ variant }) {
	const activity = useSyncStore((s) => s.activity);
	const setScreen = useSyncStore((s) => s.setScreen);
	const usageMb = useSyncStore((s) => s.usageMb);
	const devices = useSyncStore((s) => s.devices);
	if (variant === "mobile") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "hero-wash space-y-4 px-4 pb-8 pt-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeviceHero, { compact: true }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileStats, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold",
					children: "Acciones rápidas"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "text-xs text-muted",
					onClick: () => setScreen("automations"),
					children: "Ver todo"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickActions, { dense: true })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-[24px] bg-surface px-4 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between pt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: "Actividad reciente"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-xs text-muted",
						onClick: () => setScreen("activity"),
						children: "Ver todo"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityList, {
					items: activity,
					limit: 3
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setScreen("widgets"),
				className: "flex w-full items-center justify-between rounded-[24px] bg-sidebar p-4 text-left text-sidebar-fg shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold",
					children: "Widgets para tu móvil"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-sidebar-muted",
					children: "Reloj, estado de sync y acciones rápidas. Varios tamaños."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-medium text-sidebar-muted",
					children: "Ver"
				})]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "desktop-canvas space-y-4 p-6 lg:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeviceHero, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCards, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 xl:grid-cols-[1.1fr_0.9fr_1fr]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-[28px] bg-surface p-4 shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-sm font-semibold",
								children: "Dispositivos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "text-xs text-muted",
								onClick: () => setScreen("devices"),
								children: "Ver todos"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-1",
							children: devices.map((device) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeviceRow, {
								device,
								onSelect: () => {
									useSyncStore.getState().selectDevice(device.id);
									setScreen("devices");
								}
							}, device.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-[28px] bg-surface p-4 shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-3 text-sm font-semibold",
							children: "Acciones rápidas"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickActions, {})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-[28px] bg-surface px-4 shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-sm font-semibold",
								children: "Actividad reciente"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "text-xs text-muted",
								onClick: () => setScreen("activity"),
								children: "Ver todo"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityList, {
							items: activity,
							limit: 5
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setScreen("widgets"),
				className: "flex w-full items-center justify-between overflow-hidden rounded-[28px] bg-sidebar text-left text-sidebar-fg shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium uppercase tracking-[0.16em] text-sidebar-muted",
							children: "Widgets para tu móvil"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-lg font-semibold",
							children: "Reloj, sync y acciones en la pantalla de inicio."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-sidebar-muted",
							children: "Varios tamaños · cristal oscuro o claro"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/media/silk-wide.jpg",
					alt: "",
					className: "hidden h-28 w-48 object-cover sm:block"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "rounded-[28px] bg-sidebar p-5 text-sidebar-fg shadow-[var(--shadow-border)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-6 lg:grid-cols-[1.2fr_1fr_1fr]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] uppercase tracking-[0.14em] text-sidebar-muted",
								children: "Uso de sincronización"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-3xl font-semibold tabular-nums",
								children: [
									usageMb,
									" MB",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium text-sidebar-muted",
										children: "este mes"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsageMeter, { parts: USAGE_BREAKDOWN })
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] uppercase tracking-[0.14em] text-sidebar-muted",
								children: "Rendimiento"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-3xl font-semibold tabular-nums",
								children: "12 ms"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-sidebar-muted",
								children: "latencia promedio"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SparkLine, {
								values: LATENCY_SPARK,
								className: "mt-3 h-8 w-40"
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setScreen("devices"),
							className: "flex items-center justify-between rounded-2xl bg-sidebar-fg/6 px-4 py-3 text-left",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex items-center gap-2 text-sm font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex size-8 items-center justify-center rounded-full bg-ok/20 text-ok",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" })
								}), "Todo en óptimas condiciones"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-sidebar-muted",
								children: "Sync Engine está funcionando correctamente."
							})] })
						})
					]
				})
			})
		]
	});
}
function MobileStats() {
	const health = useSyncStore((s) => s.health);
	const eventsToday = useSyncStore((s) => s.eventsToday);
	const filesSynced = useSyncStore((s) => s.filesSynced);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "grid grid-cols-3 gap-2 rounded-[24px] bg-surface p-3 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Salud de sync"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-lg font-semibold tabular-nums",
						children: [health.toFixed(1), "%"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ring, {
							value: health,
							size: 36,
							stroke: 4
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Eventos hoy"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-lg font-semibold tabular-nums",
						children: eventsToday
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SparkBars, {
						values: EVENT_BARS,
						className: "mx-auto mt-2 h-7 justify-center"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Archivos sync"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-lg font-semibold tabular-nums",
						children: filesSynced.toLocaleString("es-PE")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SparkLine, {
						values: FILE_SPARK,
						className: "mx-auto mt-1 h-7 w-16"
					})
				]
			})
		]
	});
}
function DevicesScreen() {
	const devices = useSyncStore((s) => s.devices);
	const filter = useSyncStore((s) => s.deviceFilter);
	const setFilter = useSyncStore((s) => s.setDeviceFilter);
	const selectedId = useSyncStore((s) => s.selectedDeviceId);
	const selectDevice = useSyncStore((s) => s.selectDevice);
	const addDevice = useSyncStore((s) => s.addDevice);
	const removeDevice = useSyncStore((s) => s.removeDevice);
	const search = useSyncStore((s) => s.search);
	const [adding, setAdding] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [kind, setKind] = (0, import_react.useState)("laptop");
	const filters = [
		{
			id: "all",
			label: "Todos"
		},
		{
			id: "Windows",
			label: "Windows"
		},
		{
			id: "Android",
			label: "Android"
		},
		{
			id: "Apple",
			label: "Apple"
		}
	];
	const visible = devices.filter((device) => {
		const byPlat = filter === "all" || device.platform === filter;
		const byQuery = !search || matchesQuery(`${device.name} ${device.os}`, search);
		return byPlat && byQuery;
	});
	const selected = devices.find((d) => d.id === selectedId) ?? visible[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 px-4 py-4 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-semibold tracking-tight",
					children: "Dispositivos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "icon",
					onClick: () => setAdding(true),
					"aria-label": "Añadir dispositivo",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-5" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2 overflow-x-auto pb-1",
				children: filters.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setFilter(item.id),
					className: cn("h-9 shrink-0 rounded-full px-4 text-sm font-medium transition-colors duration-[var(--motion-quick)]", filter === item.id ? "bg-fg text-primary-fg" : "bg-surface text-muted shadow-[var(--shadow-border)]"),
					children: item.label
				}, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-[1.1fr_0.9fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-1 rounded-[28px] bg-surface p-2 shadow-[var(--shadow-border)]",
					children: [visible.map((device) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeviceRow, {
						device,
						selected: selected?.id === device.id,
						onSelect: () => selectDevice(device.id)
					}, device.id)), visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-3 py-8 text-center text-sm text-muted",
						children: "Ningún dispositivo coincide."
					}) : null]
				}), selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-[28px] bg-surface p-5 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: selected.image,
							alt: selected.name,
							className: "h-40 w-full rounded-2xl object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-center gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusDot, { online: selected.status === "online" }), selected.status === "online" ? "Conectado" : "Sin conexión"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 text-xl font-semibold",
							children: selected.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								kindLabel(selected.kind),
								" · ",
								selected.os
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-4 grid grid-cols-2 gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-bg p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs text-muted",
									children: "Latencia"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1 font-semibold tabular-nums",
									children: selected.latencyMs != null ? `${selected.latencyMs} ms` : "—"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-bg p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs text-muted",
									children: "Visto"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1 font-semibold",
									children: selected.lastSeenLabel
								})]
							})]
						}),
						!selected.current ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "danger",
							className: "mt-4 w-full",
							onClick: () => removeDevice(selected.id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), "Quitar dispositivo"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-xs text-muted",
							children: "Este es el dispositivo desde el que estás viendo Sync Engine."
						})
					]
				}) : null]
			}),
			adding ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-40 flex items-end justify-center bg-overlay p-3 sm:items-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md rounded-[28px] bg-surface p-5 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold",
							children: "Añadir dispositivo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "Entra en la flota con un nombre y un tipo."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-4 block text-sm font-medium",
							children: ["Nombre", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "mt-1.5",
								value: name,
								onChange: (e) => setName(e.target.value),
								placeholder: "Galaxy de Ana"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 grid grid-cols-2 gap-2",
							children: [
								"laptop",
								"phone",
								"tablet",
								"desktop"
							].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setKind(item),
								className: cn("h-11 rounded-2xl text-sm font-medium", kind === item ? "bg-fg text-primary-fg" : "bg-bg text-muted"),
								children: kindLabel(item)
							}, item))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								className: "flex-1",
								onClick: () => setAdding(false),
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "flex-1",
								onClick: () => {
									addDevice(name, kind);
									setName("");
									setAdding(false);
								},
								children: "Conectar"
							})]
						})
					]
				})
			}) : null
		]
	});
}
function ActivityScreen() {
	const activity = useSyncStore((s) => s.activity);
	const search = useSyncStore((s) => s.search);
	const items = activity.filter((item) => !search || matchesQuery(`${item.title} ${item.detail}`, search));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-4 py-4 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold tracking-tight",
				children: "Actividad"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Todo lo que se mueve entre tus dispositivos."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-4 rounded-[28px] bg-surface px-4 shadow-[var(--shadow-border)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityList, { items })
			})
		]
	});
}
function FilesScreen() {
	const files = useSyncStore((s) => s.files);
	const search = useSyncStore((s) => s.search);
	const items = files.filter((file) => !search || matchesQuery(`${file.name} ${file.device}`, search));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-4 py-4 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold tracking-tight",
				children: "Archivos"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Recientes en la nube local de Sync Engine."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-4 divide-y divide-border rounded-[28px] bg-surface px-4 shadow-[var(--shadow-border)]",
				children: [items.map((file) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileRow, { file }, file.id)), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-8 text-center text-sm text-muted",
					children: "No hay archivos con esa búsqueda."
				}) : null]
			})
		]
	});
}
function AiScreen() {
	const devices = useSyncStore((s) => s.devices);
	const health = useSyncStore((s) => s.health);
	const eventsToday = useSyncStore((s) => s.eventsToday);
	const [prompt, setPrompt] = (0, import_react.useState)("");
	const [answer, setAnswer] = (0, import_react.useState)(null);
	const offline = devices.filter((d) => d.status === "offline");
	const slow = [...devices].filter((d) => d.latencyMs != null).sort((a, b) => (b.latencyMs ?? 0) - (a.latencyMs ?? 0))[0];
	function reply(text) {
		const q = text.toLowerCase();
		if (q.includes("lento") || q.includes("latencia")) return `${slow?.name ?? "Ningún dispositivo"} es el más lento ahora (${slow?.latencyMs ?? "—"} ms). El resto de la flota está por debajo de 20 ms.`;
		if (q.includes("desconect") || q.includes("ipad")) return offline.length ? `${offline.map((d) => d.name).join(", ")} está sin conexión. El resto responde con salud ${health}%.` : "Todos los dispositivos están en línea.";
		return `Flota en ${health}% de salud. ${eventsToday} eventos hoy. ${devices.filter((d) => d.status === "online").length} de ${devices.length} dispositivos conectados. ${offline[0] ? `${offline[0].name} lleva rato fuera.` : "Nada urgente."}`;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-4 py-4 lg:max-w-2xl lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold tracking-tight",
				children: "IA Assist"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Resúmenes y diagnóstico de tu ecosistema, sin salir de Sync Engine."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Insight, {
					title: "Estado de la flota",
					body: reply("estado"),
					onUse: () => {
						setPrompt("¿Cómo está mi flota?");
						setAnswer(reply("estado"));
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Insight, {
					title: "Quién está fuera",
					body: offline[0] ? `${offline[0].name} no responde.` : "Todos conectados.",
					onUse: () => {
						setPrompt("¿Qué dispositivo está desconectado?");
						setAnswer(reply("desconect"));
					}
				})]
			}),
			answer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 rounded-[24px] bg-surface p-4 text-sm leading-relaxed shadow-[var(--shadow-border)]",
				children: answer
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-4 flex gap-2",
				onSubmit: (e) => {
					e.preventDefault();
					if (!prompt.trim()) return;
					setAnswer(reply(prompt));
					useSyncStore.getState().askAi(prompt);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: prompt,
					onChange: (e) => setPrompt(e.target.value),
					placeholder: "Pregunta por latencia, archivos o un dispositivo…"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "submit",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), "Analizar"]
				})]
			})
		]
	});
}
function Insight({ title, body, onUse }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: onUse,
		className: "rounded-[24px] bg-surface p-4 text-left shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-semibold",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: body
		})]
	});
}
function AutomationsScreen() {
	const automations = useSyncStore((s) => s.automations);
	const toggle = useSyncStore((s) => s.toggleAutomation);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-4 py-4 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold tracking-tight",
				children: "Automatizaciones"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Reglas que corren entre portátil, móvil y escritorio."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-3",
				children: automations.map((rule) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-3 rounded-[24px] bg-surface p-4 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: rule.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								rule.when,
								" · ",
								rule.action
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: rule.enabled,
						onCheckedChange: () => toggle(rule.id),
						"aria-label": `Activar ${rule.name}`
					})]
				}, rule.id))
			})
		]
	});
}
function SettingsScreen() {
	const name = useSyncStore((s) => s.displayName);
	const setName = useSyncStore((s) => s.setName);
	const resetDemo = useSyncStore((s) => s.resetDemo);
	const widget = useSyncStore((s) => s.widget);
	const setWidget = useSyncStore((s) => s.setWidget);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-4 py-4 lg:max-w-xl lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold tracking-tight",
				children: "Ajustes"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-6 block text-sm font-medium",
				children: ["Cómo te llamamos", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "mt-1.5",
					value: name,
					onChange: (e) => setName(e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: "Estilo de widgets"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex gap-2",
					children: ["dark", "light"].map((style) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setWidget({ style }),
						className: cn("h-10 flex-1 rounded-2xl text-sm font-medium", widget.style === style ? "bg-fg text-primary-fg" : "bg-surface text-muted shadow-[var(--shadow-border)]"),
						children: style === "dark" ? "Cristal oscuro" : "Cristal claro"
					}, style))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				className: "mt-8",
				onClick: resetDemo,
				children: "Restablecer demo"
			})
		]
	});
}
function WidgetsScreen() {
	const widget = useSyncStore((s) => s.widget);
	const setWidget = useSyncStore((s) => s.setWidget);
	const setScreen = useSyncStore((s) => s.setScreen);
	const copyClipboard = useSyncStore((s) => s.copyClipboard);
	const syncNow = useSyncStore((s) => s.syncNow);
	const askAi = useSyncStore((s) => s.askAi);
	const style = widget.style;
	const onAction = (id) => {
		if (id === "clipboard") copyClipboard();
		if (id === "sync") syncNow();
		if (id === "ai") askAi();
		if (id === "automations") setScreen("automations");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative overflow-hidden px-4 py-6 lg:px-8 lg:py-8",
			style: {
				backgroundImage: `linear-gradient(180deg, rgba(11,18,32,0.35), rgba(11,18,32,0.55)), url(${widget.wallpaper === "/media/silk-tall.jpg" ? "/media/silk-wide.jpg" : widget.wallpaper})`,
				backgroundSize: "cover",
				backgroundPosition: "center"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 mx-auto max-w-6xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.16em] text-widget-fg/80",
						children: "Widgets para tu móvil"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 max-w-lg text-3xl font-semibold tracking-tight text-widget-fg",
						children: "Información clave de un vistazo. Varios tamaños."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneFrame, {
							wallpaper: widget.wallpaper,
							lock: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockWidget, {
								style,
								className: "mx-auto w-full shadow-none"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid w-full max-w-xl gap-4 sm:grid-cols-2",
							children: [
								widget.stats ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatsWidget, {
									style,
									className: "sm:col-span-2"
								}) : null,
								widget.device ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeviceWidget, { style }) : null,
								widget.actions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionsWidget, {
									style,
									onAction
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HealthHeroWidget, {
									style: "light",
									className: "sm:col-span-2"
								})
							]
						})]
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5 px-4 py-6 lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold",
					children: "Fondo del teléfono"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex gap-3 overflow-x-auto pb-1",
					children: WALLPAPERS.map((paper) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setWidget({ wallpaper: paper.src }),
						className: cn("shrink-0 overflow-hidden rounded-2xl ring-2 ring-transparent transition-shadow duration-[var(--motion-quick)]", widget.wallpaper === paper.src && "ring-primary"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: paper.src,
							alt: paper.label,
							className: "h-24 w-16 object-cover"
						})
					}, paper.id))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold",
					children: "Qué mostrar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						["lock", "Pantalla de bloqueo"],
						["stats", "Widget de estado"],
						["device", "Widget 2×2 dispositivo"],
						["actions", "Widget 2×2 acciones"]
					].map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex h-12 items-center justify-between rounded-2xl bg-surface px-4 shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm",
							children: label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: widget[key],
							onCheckedChange: (checked) => setWidget({ [key]: checked })
						})]
					}, key))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "flex gap-2",
					children: ["dark", "light"].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: widget.style === item ? "default" : "secondary",
						onClick: () => setWidget({ style: item }),
						children: item === "dark" ? "Cristal oscuro" : "Cristal claro"
					}, item))
				})
			]
		})]
	});
}
function Greeting() {
	const name = useSyncStore((s) => s.displayName);
	const hour = (0, import_react.useMemo)(() => /* @__PURE__ */ new Date(), []).getHours();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
		className: "text-2xl font-semibold tracking-tight lg:text-3xl",
		children: [
			hour < 12 ? "Buenos días" : hour < 19 ? "Buenas tardes" : "Buenas noches",
			", ",
			name || "Jose",
			"."
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-1 text-sm text-muted",
		children: "Todos tus dispositivos conectados y listos para avanzar."
	})] });
}
function NotificationsPanel() {
	const open = useSyncStore((s) => s.notifyOpen);
	const setOpen = useSyncStore((s) => s.setNotifyOpen);
	const offline = useSyncStore((s) => s.devices).filter((d) => d.status === "offline");
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute right-4 top-16 z-30 w-80 rounded-[24px] bg-surface p-3 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-2 flex items-center justify-between px-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-semibold",
				children: "Avisos"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "text-xs text-muted",
				onClick: () => setOpen(false),
				children: "Cerrar"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "space-y-2 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "rounded-2xl bg-ok-soft p-3 text-fg",
				children: "Sincronización completa en Xiaomi 2312."
			}), offline.map((device) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-2xl bg-warn-soft p-3",
				children: [
					device.name,
					" sin conexión · ",
					device.lastSeenLabel
				]
			}, device.id))]
		})]
	});
}
function HeaderActions() {
	const notifyOpen = useSyncStore((s) => s.notifyOpen);
	const setNotifyOpen = useSyncStore((s) => s.setNotifyOpen);
	const setScreen = useSyncStore((s) => s.setScreen);
	const name = useSyncStore((s) => s.displayName);
	const offline = useSyncStore((s) => s.devices.filter((d) => d.status === "offline").length);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex shrink-0 items-center gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "ghost",
			size: "icon-sm",
			className: "relative",
			"aria-label": "Notificaciones",
			onClick: () => setNotifyOpen(!notifyOpen),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-5" }), offline > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute right-1.5 top-1.5 size-2 rounded-full bg-danger" }) : null]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => setScreen("settings"),
			className: "avatar-chip",
			"aria-label": "Ajustes de perfil",
			children: (name || "J").slice(0, 1).toUpperCase()
		})]
	});
}
function SearchBar() {
	const search = useSyncStore((s) => s.search);
	const setSearch = useSyncStore((s) => s.setSearch);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "relative hidden min-w-64 flex-1 lg:block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			value: search,
			onChange: (e) => setSearch(e.target.value),
			placeholder: "Buscar archivos, dispositivos, acciones…",
			className: "h-11 rounded-full border-transparent bg-surface pl-10 shadow-[var(--shadow-border)]"
		})]
	});
}
var TAB_ICON = {
	home: House,
	devices: MonitorSmartphone,
	activity: Activity,
	files: Folder,
	ai: Sparkles
};
function ScreenBody({ variant }) {
	switch (useSyncStore((s) => s.screen)) {
		case "home": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeScreen, { variant });
		case "devices": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DevicesScreen, {});
		case "activity": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityScreen, {});
		case "files": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilesScreen, {});
		case "ai": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiScreen, {});
		case "automations": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AutomationsScreen, {});
		case "settings": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsScreen, {});
		case "widgets": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WidgetsScreen, {});
	}
}
function App() {
	(0, import_react.useEffect)(() => {
		const vista = new URLSearchParams(window.location.search).get("vista");
		if (vista && [
			"home",
			"devices",
			"activity",
			"files",
			"ai",
			"automations",
			"settings",
			"widgets"
		].includes(vista)) useSyncStore.getState().setScreen(vista);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "hidden min-h-dvh w-full lg:flex",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesktopShell, {})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-dvh w-full flex-col lg:hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileShell, {})
	})] });
}
function DesktopShell() {
	const screen = useSyncStore((s) => s.screen);
	const setScreen = useSyncStore((s) => s.setScreen);
	const health = useSyncStore((s) => s.health);
	const now = useNow(3e4);
	const date = capitalize(format(now, "EEEE, d 'de' MMMM", { locale: es }));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh w-full bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "flex w-[240px] shrink-0 flex-col bg-sidebar px-3 py-5 text-sidebar-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, { inverted: true })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "mt-8 flex flex-1 flex-col gap-1",
					children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setScreen(item.id),
						className: cn("flex h-11 items-center rounded-[14px] px-3 text-sm font-medium transition-colors duration-[var(--motion-quick)]", screen === item.id ? "bg-sidebar-fg/10 text-sidebar-fg" : "text-sidebar-muted hover:bg-sidebar-fg/6 hover:text-sidebar-fg"),
						children: item.label
					}, item.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-sidebar-fg/6 p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-2 text-xs font-medium text-ok",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-ok" }), "Sincronización activa"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-sidebar-muted",
							children: [
								"Salud ",
								health.toFixed(1),
								"% · todo en orden"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "sidebar",
							size: "sm",
							className: "mt-3 w-full border border-sidebar-line",
							onClick: () => setScreen("devices"),
							children: "Ver detalles"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 px-2 text-[11px] text-sidebar-muted",
					children: "SYNC ENGINE v1.0"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex min-w-0 flex-1 flex-col",
			children: [
				screen !== "widgets" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center justify-between gap-4 px-8 pb-2 pt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.16em] text-muted",
						children: date
					}), screen === "home" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Greeting, {})
					}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderActions, {})]
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationsPanel, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "min-h-0 flex-1 overflow-y-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenBody, { variant: "desktop" })
				})
			]
		})]
	});
}
function MobileShell() {
	const screen = useSyncStore((s) => s.screen);
	const setScreen = useSyncStore((s) => s.setScreen);
	const [menu, setMenu] = (0, import_react.useState)(false);
	const now = useNow();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-dvh w-full flex-col bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-4 pb-1 pt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-semibold tabular-nums",
					children: format(now, "H:mm")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted",
					children: "LTE"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative z-10 flex items-center justify-between bg-bg px-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						"aria-label": "Menú",
						onClick: () => setMenu(true),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderActions, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationsPanel, {})
				]
			}),
			screen === "home" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 pb-2 pt-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Greeting, {})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "min-h-0 flex-1 overflow-y-auto pb-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenBody, { variant: "mobile" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-20 border-t border-border bg-surface/95 px-2 pb-[max(12px,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid grid-cols-5",
					children: MOBILE_TABS.map((id) => {
						const Icon = TAB_ICON[id];
						const label = NAV.find((n) => n.id === id)?.label ?? id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setScreen(id),
							className: cn("flex h-14 w-full flex-col items-center justify-center gap-1 text-[11px] font-medium", screen === id ? "text-primary" : "text-muted"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" }), label.replace(" Assist", "")]
						}) }, id);
					})
				})
			}),
			menu ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-40 bg-overlay",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-full max-w-sm flex-col bg-surface p-4 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							"aria-label": "Cerrar menú",
							onClick: () => setMenu(false),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 space-y-1",
						children: [
							"widgets",
							"automations",
							"settings"
						].map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "flex h-12 w-full items-center rounded-2xl px-3 text-left text-sm font-medium hover:bg-bg",
							onClick: () => {
								setScreen(id);
								setMenu(false);
							},
							children: NAV.find((n) => n.id === id)?.label
						}, id))
					})]
				})
			}) : null
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(App, {});
}
//#endregion
export { Home as component };
