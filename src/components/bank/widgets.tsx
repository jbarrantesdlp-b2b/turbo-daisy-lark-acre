import { ArrowUpRight } from "lucide-react";
import { HalftoneField } from "@/components/bank/halftone";
import { cn } from "@/lib/utils";

const BARS = [54, 70, 46, 82, 58, 94, 50, 74, 42, 100];

const ACTIVITY = [
  { title: "CorexK", detail: "Broadcast", amount: "+6,250.00", dir: "in" as const },
  { title: "Enomel", detail: "Transfer", amount: "-15,600.00", dir: "out" as const },
];

export function BankingWidgets() {
  return (
    <div className="bank-canvas relative flex min-h-dvh items-center justify-center px-4 py-10 sm:px-8">
      <HalftoneField />
      <div className="relative z-10 mx-auto grid w-full max-w-[980px] gap-5 lg:grid-cols-[1.08fr_0.92fr] lg:gap-6">
        <div className="flex flex-col gap-5 lg:gap-6">
          <BalanceCard />
          <WhyCard />
        </div>
        <div className="flex flex-col gap-5 lg:gap-6">
          <CoffeeCard />
          <SpendCard className="lg:flex-1" />
        </div>
      </div>
    </div>
  );
}

function BalanceCard() {
  return (
    <article className="bank-card rounded-[40px] p-8">
      <p className="bank-muted text-[13px] font-medium">Total Balance</p>
      <p className="mt-3 flex items-baseline gap-2.5">
        <span className="bank-num text-[50px] font-semibold leading-none sm:text-[56px]">
          148,420.80
        </span>
        <span className="bank-muted pb-1 text-[15px] font-medium">USD</span>
      </p>

      <p className="mt-9 text-[14px] font-medium text-white/90">Recent Activity</p>
      <ul className="mt-5 space-y-4">
        {ACTIVITY.map((row) => (
          <li key={row.title} className="flex items-center gap-3.5">
            <span className={cn("bank-dot shrink-0", row.dir === "in" ? "bank-dot-in" : "bank-dot-out")} />
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-semibold leading-tight">{row.title}</p>
              <p className="bank-muted mt-0.5 text-[12px]">{row.detail}</p>
            </div>
            <p className="bank-num text-[14px] font-medium text-white/90">{row.amount}</p>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="mt-8 flex h-11 w-full items-center justify-center rounded-full bg-white text-[15px] font-medium text-[#141414]"
      >
        See all
      </button>
    </article>
  );
}

function PinMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2.2c-3.9 0-7 3-7 6.8 0 4.8 7 12.8 7 12.8s7-8 7-12.8c0-3.8-3.1-6.8-7-6.8Zm0 9.3a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"
      />
    </svg>
  );
}

function CoffeeCard() {
  return (
    <article className="bank-card flex items-center gap-4 rounded-[32px] px-5 py-[18px]">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#ff4a12] text-white">
        <PinMark />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[16px] font-semibold leading-tight">Coffee Shop</p>
        <p className="bank-muted mt-0.5 text-[13px]">Coffee</p>
      </div>
      <p className="bank-num text-[16px] font-semibold">-$9.80</p>
    </article>
  );
}

function WhyCard() {
  return (
    <article className="bank-card relative rounded-[40px] p-8 pb-[88px]">
      <p className="bank-muted text-[13px] font-medium">Why Choose Us</p>
      <h2 className="mt-5 text-[36px] font-semibold leading-[1.06] tracking-[-0.038em] sm:text-[42px]">
        Smart banking
        <br />
        for modern
        <br />
        payments
      </h2>
      <p className="bank-muted mt-5 max-w-[32ch] text-[14px] leading-[1.55]">
        Run online banking with secure transfers, investment tools and simplified
        management for everyday finance.
      </p>
      <button
        type="button"
        aria-label="Continuar"
        className="absolute bottom-8 right-8 flex size-[56px] items-center justify-center rounded-full bg-white text-[#ff4a12]"
      >
        <ArrowUpRight className="size-6 translate-x-px" strokeWidth={2.5} />
      </button>
    </article>
  );
}

function SpendCard({ className }: { className?: string }) {
  return (
    <article className={cn("bank-card flex flex-col rounded-[40px] p-8", className)}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-[15px] font-medium">Monthly Spend</p>
        <span className="rounded-full bg-white/[0.07] px-3 py-1 text-[12px] font-medium text-white/55">
          month
        </span>
      </div>
      <p className="mt-4 flex items-baseline gap-2.5">
        <span className="bank-num text-[44px] font-semibold leading-none sm:text-[50px]">
          14,920
        </span>
        <span className="bank-muted pb-1 text-[15px] font-medium">USD</span>
      </p>
      <div className="mt-8 flex h-[120px] items-end justify-between gap-[6px]">
        {BARS.map((h, i) => (
          <span
            key={i}
            className={cn("bank-bar", i === BARS.length - 1 && "bank-bar-hot")}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="mt-auto flex items-end justify-between gap-3 pt-7 text-[11px] leading-none">
        <p className="bank-muted">89.00% exceeding limit used</p>
        <p className="text-white/70">+5.00% this month</p>
      </div>
    </article>
  );
}
