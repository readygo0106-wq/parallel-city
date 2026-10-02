import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
export default function NotFound() { return <><SiteHeader /><main className="empty-result page-shell"><h1>This route has drifted away.</h1><p>Return to the city and choose a new path.</p><Link className="primary-link" href="/">RETURN HOME ↗</Link></main></>; }
