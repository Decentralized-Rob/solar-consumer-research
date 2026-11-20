import "./freedom-mobile.css";
import { SiteHeader } from "../../../components/site-header";

export default function FreedomForeverLayout({ children }: { children: React.ReactNode }) {
  return <><SiteHeader />{children}</>;
}
