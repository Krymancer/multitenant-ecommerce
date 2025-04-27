import { CustomCategory } from "../types";

export default function CategoriesSidebar(
  { open, onOpenChange }: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: CustomCategory[]
  }
) {
  return (
    <div>Sidebar</div>
  )
}