"use client"

import * as React from "react"
import { useState, useMemo } from "react"
import { Button } from "../../ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../ui/card"
import { Badge } from "../../ui/badge"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "../../ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "../../ui/sheet"
import {
  PlusIcon,
  MoreVerticalIcon,
  SearchIcon,
  MailIcon,
  PencilIcon,
  Trash2Icon,
  UserPlusIcon,
  ShieldCheckIcon,
  UsersIcon,
  CheckCircle2Icon,
  WifiOffIcon,
  SendIcon,
  XIcon,
  FilterIcon,
} from "lucide-react"

// ─── Dummy Data ────────────────────────────────────────────────────────────────
const initialMembers = [
  {
    id: 1,
    name: "Aanya Sharma",
    email: "aanya@example.com",
    role: "admin",
    status: "active",
    lastActive: "Just now",
    avatar: "",
  },
  {
    id: 2,
    name: "Rohan Mehta",
    email: "rohan@example.com",
    role: "manager",
    status: "active",
    lastActive: "2 hours ago",
    avatar: "",
  },
  {
    id: 3,
    name: "Priya Nair",
    email: "priya@example.com",
    role: "member",
    status: "offline",
    lastActive: "Yesterday",
    avatar: "",
  },
  {
    id: 4,
    name: "Karan Patel",
    email: "karan@example.com",
    role: "member",
    status: "active",
    lastActive: "5 min ago",
    avatar: "",
  },
  {
    id: 5,
    name: "Sneha Gupta",
    email: "sneha@example.com",
    role: "manager",
    status: "invited",
    lastActive: "—",
    avatar: "",
  },
  {
    id: 6,
    name: "Dev Kumar",
    email: "dev@example.com",
    role: "member",
    status: "offline",
    lastActive: "3 days ago",
    avatar: "",
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

const AVATAR_COLORS = [
  "bg-violet-500",
  "bg-blue-500",
  "bg-emerald-500",
  "bg-orange-500",
  "bg-pink-500",
  "bg-teal-500",
]
const getMemberColor = (id) => AVATAR_COLORS[(id - 1) % AVATAR_COLORS.length]

const ROLE_CONFIG = {
  admin: {
    label: "Admin",
    classes:
      "bg-violet-500/10 text-violet-600 border-violet-200 dark:border-violet-800 dark:text-violet-400",
  },
  manager: {
    label: "Manager",
    classes:
      "bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-800 dark:text-blue-400",
  },
  member: {
    label: "Member",
    classes:
      "bg-muted text-muted-foreground border-border",
  },
}

const STATUS_CONFIG = {
  active: {
    label: "Active",
    dot: "bg-emerald-500",
    classes:
      "bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-800 dark:text-emerald-400",
  },
  offline: {
    label: "Offline",
    dot: "bg-gray-400",
    classes:
      "bg-muted text-muted-foreground border-border",
  },
  invited: {
    label: "Invited",
    dot: "bg-amber-400",
    classes:
      "bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-800 dark:text-amber-400",
  },
}

const EMPTY_FORM = {
  name: "",
  email: "",
  role: "member",
  status: "active",
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function MemberAvatar({ member }) {
  return (
    <div className="relative inline-flex shrink-0">
      <Avatar size="lg">
        {member.avatar ? (
          <AvatarImage src={member.avatar} alt={member.name} />
        ) : null}
        <AvatarFallback
          className={`${getMemberColor(member.id)} text-white font-semibold text-sm`}
        >
          {getInitials(member.name)}
        </AvatarFallback>
      </Avatar>
      <span
        className={`absolute bottom-0 right-0 size-2.5 rounded-full ring-2 ring-background ${STATUS_CONFIG[member.status].dot}`}
      />
    </div>
  )
}

function MemberActions({ member, onEdit, onRemove, onChangeRole }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 opacity-60 hover:opacity-100 transition-opacity"
          aria-label="Member actions"
        >
          <MoreVerticalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onEdit(member)}>
          <PencilIcon className="h-4 w-4 mr-2" />
          Edit Member
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
          Change Role
        </DropdownMenuLabel>
        {["admin", "manager", "member"]
          .filter((r) => r !== member.role)
          .map((role) => (
            <DropdownMenuItem
              key={role}
              onClick={() => onChangeRole(member.id, role)}
            >
              <ShieldCheckIcon className="h-4 w-4 mr-2" />
              Make {ROLE_CONFIG[role].label}
            </DropdownMenuItem>
          ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={() => onRemove(member.id)}
        >
          <Trash2Icon className="h-4 w-4 mr-2" />
          Remove Member
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// ─── Member Form Sheet ─────────────────────────────────────────────────────────
function MemberSheet({ open, onOpenChange, editing, onSave }) {
  const [form, setForm] = useState(EMPTY_FORM)

  React.useEffect(() => {
    setForm(editing ? { name: editing.name, email: editing.email, role: editing.role, status: editing.status } : EMPTY_FORM)
  }, [editing, open])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(form)
  }

  const field = (key) => ({
    value: form[key],
    onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })),
  })

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex flex-col sm:max-w-md w-full overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{editing ? "Edit Member" : "Add Member"}</SheetTitle>
          <SheetDescription>
            {editing ? "Update this member's details and role." : "Add a new member to your team."}
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-5 py-6">
          <div className="space-y-2">
            <Label htmlFor="member-name">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input id="member-name" placeholder="e.g. Jane Smith" {...field("name")} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="member-email">
              Email <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="member-email"
                type="email"
                placeholder="jane@example.com"
                className="pl-9"
                {...field("email")}
                required
              />
            </div>
          </div>

          <div className="space-y-2 flex flex-col">
            <Label htmlFor="member-role">Role</Label>
            <Select
              value={form.role}
              onValueChange={(val) => setForm((f) => ({ ...f, role: val }))}
            >
              <SelectTrigger id="member-role" className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="member">Member</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 flex flex-col">
            <Label htmlFor="member-status">Status</Label>
            <Select
              value={form.status}
              onValueChange={(val) => setForm((f) => ({ ...f, status: val }))}
            >
              <SelectTrigger id="member-status" className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
                <SelectItem value="invited">Invited</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <SheetFooter className="mt-auto">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" className="w-full sm:w-auto">
              {editing ? "Save Changes" : "Add Member"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}

// ─── Invite Modal ──────────────────────────────────────────────────────────────
function InviteSheet({ open, onOpenChange, onInvite }) {
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("member")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    onInvite(email.trim(), role)
    setEmail("")
    setRole("member")
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex flex-col sm:max-w-sm w-full">
        <SheetHeader>
          <SheetTitle>Invite Team Member</SheetTitle>
          <SheetDescription>
            Send an email invitation to a new team member.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-5 py-6">
          <div className="space-y-2">
            <Label htmlFor="invite-email">
              Email Address <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="invite-email"
                type="email"
                placeholder="colleague@company.com"
                className="pl-9"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2 flex flex-col">
            <Label htmlFor="invite-role">Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger id="invite-role" className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="member">Member</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              They'll receive an email invite and be added as <strong>{ROLE_CONFIG[role].label}</strong>.
            </p>
          </div>

          <SheetFooter className="mt-auto">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" className="gap-2 w-full sm:w-auto">
              <SendIcon className="h-4 w-4" />
              Send Invite
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}

// ─── Stats Cards ──────────────────────────────────────────────────────────────
function StatsCards({ members }) {
  const stats = useMemo(() => ({
    total: members.length,
    active: members.filter((m) => m.status === "active").length,
    invited: members.filter((m) => m.status === "invited").length,
    admins: members.filter((m) => m.role === "admin").length,
  }), [members])

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {[
        { label: "Total Members", value: stats.total, icon: <UsersIcon className="h-4 w-4" />, color: "text-primary" },
        { label: "Active Now", value: stats.active, icon: <CheckCircle2Icon className="h-4 w-4" />, color: "text-emerald-500" },
        { label: "Pending Invites", value: stats.invited, icon: <MailIcon className="h-4 w-4" />, color: "text-amber-500" },
        { label: "Admins", value: stats.admins, icon: <ShieldCheckIcon className="h-4 w-4" />, color: "text-violet-500" },
      ].map(({ label, value, icon, color }) => (
        <Card key={label} className="py-4">
          <CardContent className="px-4 flex items-center gap-3">
            <span className={`p-2 rounded-lg bg-muted ${color}`}>{icon}</span>
            <div>
              <p className="text-2xl font-bold leading-none">{value}</p>
              <p className="text-xs text-muted-foreground mt-1">{label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// ─── Main View ────────────────────────────────────────────────────────────────
export function TeamView() {
  const [members, setMembers] = useState(initialMembers)
  const [search, setSearch] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const [sheetOpen, setSheetOpen] = useState(false)
  const [inviteOpen, setInviteOpen] = useState(false)
  const [editingMember, setEditingMember] = useState(null)

  // ── Derived list ──────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return members.filter((m) => {
      const matchSearch =
        !q || m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q)
      const matchRole = filterRole === "all" || m.role === filterRole
      const matchStatus = filterStatus === "all" || m.status === filterStatus
      return matchSearch && matchRole && matchStatus
    })
  }, [members, search, filterRole, filterStatus])

  // ── Handlers ──────────────────────────────────────────────────────────────
  const openAdd = () => {
    setEditingMember(null)
    setSheetOpen(true)
  }

  const openEdit = (member) => {
    setEditingMember(member)
    setSheetOpen(true)
  }

  const handleSaveMember = (form) => {
    if (editingMember) {
      setMembers((prev) =>
        prev.map((m) => (m.id === editingMember.id ? { ...m, ...form } : m))
      )
    } else {
      const newMember = {
        id: Date.now(),
        ...form,
        lastActive: "—",
        avatar: "",
      }
      setMembers((prev) => [...prev, newMember])
    }
    setSheetOpen(false)
  }

  const handleRemove = (id) => {
    setMembers((prev) => prev.filter((m) => m.id !== id))
  }

  const handleChangeRole = (id, role) => {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, role } : m)))
  }

  const handleInvite = (email, role) => {
    const newMember = {
      id: Date.now(),
      name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      email,
      role,
      status: "invited",
      lastActive: "—",
      avatar: "",
    }
    setMembers((prev) => [...prev, newMember])
  }

  const clearFilters = () => {
    setSearch("")
    setFilterRole("all")
    setFilterStatus("all")
  }

  const hasFilters = search || filterRole !== "all" || filterStatus !== "all"

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 overflow-y-auto no-scrollbar max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Team</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your team members, roles, and access.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="outline" className="gap-2" onClick={() => setInviteOpen(true)}>
            <MailIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Invite</span>
          </Button>
          <Button className="gap-2" onClick={openAdd}>
            <UserPlusIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Add Member</span>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <StatsCards members={members} />

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email…"
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search members"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-[130px]" aria-label="Filter by role">
                  <FilterIcon className="h-3.5 w-3.5 mr-1.5 text-muted-foreground shrink-0" />
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[140px]" aria-label="Filter by status">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                  <SelectItem value="invited">Invited</SelectItem>
                </SelectContent>
              </Select>

              {hasFilters && (
                <Button variant="ghost" size="icon" onClick={clearFilters} aria-label="Clear filters">
                  <XIcon className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Members Table Card */}
      <Card className="overflow-hidden">
        <CardHeader className="px-6 pb-0 pt-5">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">
              Members
            </CardTitle>
            <CardDescription className="text-xs">
              {filtered.length} of {members.length} member{members.length !== 1 ? "s" : ""}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="p-0 mt-4">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm" role="table" aria-label="Team members">
              <thead>
                <tr className="border-b bg-muted/30 text-muted-foreground">
                  <th className="text-left font-medium px-6 py-3 w-[280px]">Member</th>
                  <th className="text-left font-medium px-4 py-3">Role</th>
                  <th className="text-left font-medium px-4 py-3">Status</th>
                  <th className="text-left font-medium px-4 py-3 hidden lg:table-cell">Last Active</th>
                  <th className="text-right font-medium px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-16 text-muted-foreground">
                      <div className="flex flex-col items-center gap-2">
                        <UsersIcon className="h-8 w-8 opacity-30" />
                        <p className="font-medium">No members found</p>
                        <p className="text-xs">Try adjusting your search or filters.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((member) => (
                    <tr
                      key={member.id}
                      className="border-b last:border-0 hover:bg-muted/20 transition-colors group"
                    >
                      {/* Member info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <MemberAvatar member={member} />
                          <div>
                            <p className="font-medium leading-none">{member.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">{member.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-4 py-4">
                        <Badge
                          variant="outline"
                          className={`text-[11px] font-medium ${ROLE_CONFIG[member.role].classes}`}
                        >
                          {ROLE_CONFIG[member.role].label}
                        </Badge>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4">
                        <Badge
                          variant="outline"
                          className={`text-[11px] font-medium gap-1.5 ${STATUS_CONFIG[member.status].classes}`}
                        >
                          <span className={`size-1.5 rounded-full ${STATUS_CONFIG[member.status].dot}`} />
                          {STATUS_CONFIG[member.status].label}
                        </Badge>
                      </td>

                      {/* Last active */}
                      <td className="px-4 py-4 text-muted-foreground text-xs hidden lg:table-cell">
                        {member.lastActive}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <MemberActions
                          member={member}
                          onEdit={openEdit}
                          onRemove={handleRemove}
                          onChangeRole={handleChangeRole}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List */}
          <div className="md:hidden divide-y">
            {filtered.length === 0 ? (
              <div className="py-16 text-center text-muted-foreground flex flex-col items-center gap-2">
                <UsersIcon className="h-8 w-8 opacity-30" />
                <p className="font-medium">No members found</p>
                <p className="text-xs">Try adjusting your search or filters.</p>
              </div>
            ) : (
              filtered.map((member) => (
                <div key={member.id} className="flex items-center gap-3 px-4 py-4 hover:bg-muted/20 transition-colors">
                  <MemberAvatar member={member} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{member.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{member.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-medium ${ROLE_CONFIG[member.role].classes}`}
                      >
                        {ROLE_CONFIG[member.role].label}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-medium gap-1 ${STATUS_CONFIG[member.status].classes}`}
                      >
                        <span className={`size-1.5 rounded-full ${STATUS_CONFIG[member.status].dot}`} />
                        {STATUS_CONFIG[member.status].label}
                      </Badge>
                    </div>
                  </div>
                  <MemberActions
                    member={member}
                    onEdit={openEdit}
                    onRemove={handleRemove}
                    onChangeRole={handleChangeRole}
                  />
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Sheets */}
      <MemberSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        editing={editingMember}
        onSave={handleSaveMember}
      />
      <InviteSheet
        open={inviteOpen}
        onOpenChange={setInviteOpen}
        onInvite={handleInvite}
      />
    </div>
  )
}
