import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return NextResponse.redirect(new URL("/", req.url))

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single()
  if (!profile) return NextResponse.redirect(new URL("/", req.url))

  if (req.nextUrl.pathname.startsWith("/admin") && profile.role !== "admin")
    return NextResponse.redirect(new URL("/dashboard", req.url))

  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (profile.role !== "owner")
      return NextResponse.redirect(new URL("/", req.url))

    const { data: org } = await supabase
      .from("organizations")
      .select("status")
      .eq("id", profile.org_id)
      .single()
    if (org?.status !== "active")
      return NextResponse.redirect(new URL("/pending", req.url))
  }

  if (req.nextUrl.pathname.startsWith("/learn")) {
    const { data: org } = await supabase
      .from("organizations")
      .select("status")
      .eq("id", profile.org_id)
      .single()
    if (org?.status !== "active")
      return NextResponse.redirect(new URL("/", req.url))
  }

  if(profile.role === "employee"){
    const { data: org } = await supabase
      .from("organizations")
      .select("domain,status")
      .eq("id", profile.org_id)
      .single()
    if(!profile.email.endsWith(`@${org.domain}`) || org.status!=='active'){
      return NextResponse.redirect(new URL("/", req.url))
    }
  }

  return res
}
