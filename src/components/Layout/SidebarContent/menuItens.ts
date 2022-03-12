
import { IconType } from "react-icons";
import { IoMdDocument } from 'react-icons/io';
import { MdAttachMoney, MdOutlineCategory, MdOutlineSupervisorAccount } from "react-icons/md";
import { RiBankLine, RiDashboardFill } from "react-icons/ri";


interface LinkItemProps {
  name: string;
  icon: IconType;
}

const menuItens: Array<LinkItemProps> = [
  { name: "Dashboard", icon: RiDashboardFill },
  { name: "Financeiro", icon: MdAttachMoney },
  { name: "Notas de serviço", icon: IoMdDocument },
  { name: "Contas", icon: MdOutlineSupervisorAccount },
  { name: "Contas Bancárias", icon: RiBankLine },
  { name: "Categorias", icon: MdOutlineCategory },
];

export default menuItens
