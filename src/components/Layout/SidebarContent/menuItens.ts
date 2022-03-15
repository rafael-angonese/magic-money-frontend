
import { IconType } from "react-icons";
import { IoMdDocument } from 'react-icons/io';
import { MdAttachMoney, MdOutlineCategory, MdOutlineSupervisorAccount } from "react-icons/md";
import { RiBankLine, RiDashboardFill } from "react-icons/ri";


export interface LinkItemProps {
  name: string;
  path: string;
  icon: IconType;
}

const menuItens: Array<LinkItemProps> = [
  { name: "Dashboard", path: 'dashboard', icon: RiDashboardFill },
  { name: "Financeiro", path: 'dashboard', icon: MdAttachMoney },
  { name: "Notas de serviço", path: 'lala', icon: IoMdDocument },
  { name: "Contas", path: 'accounts', icon: MdOutlineSupervisorAccount },
  { name: "Contas Bancárias", path: 'bank_accounts', icon: RiBankLine },
  { name: "Categorias", path: 'categories', icon: MdOutlineCategory },
];

export default menuItens
