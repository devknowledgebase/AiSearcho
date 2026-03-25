"use client"

import * as React from "react"
import { AppSidebar } from "../../ui/app-sidebar"
import { ChartAreaInteractive } from "../../ui/chart-area-interactive"
import { DataTable } from "../../ui/data-table"
import { SectionCards } from "../../ui/section-cards"
import { SiteHeader } from "../../ui/site-header"
import { AiChatPage } from "../../ui/ai-chat-page"
import {
  SidebarInset,
  SidebarProvider,
} from "../../ui/sidebar"

import data from "./data.json"

export default function Page() {
  const [activeView, setActiveView] = React.useState("dashboard")

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        }
      }
    >
      <AppSidebar variant="inset" onNavItemClick={setActiveView} activeView={activeView} />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className={activeView === "dashboard" ? "@container/main flex flex-1 flex-col gap-2 overflow-y-auto no-scrollbar" : "hidden"}>
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 relative">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
          <div className={activeView !== "dashboard" ? "flex flex-1 flex-col overflow-hidden" : "hidden"}>
            <AiChatPage />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
