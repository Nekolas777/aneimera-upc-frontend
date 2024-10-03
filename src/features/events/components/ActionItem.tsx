import { CheckIcon } from "../../../assets/icons/CheckIcon";

interface ActionItemProps {
  caption: string;
}

export const ActionItem = ({ caption }: ActionItemProps) => {
  return (
    <li className='flex flex-row gap-3 items-center font-medium text-base md:text-xl text-white/90'>
      <CheckIcon />
      <span className='whitespace-nowrap'>{ caption }</span>
    </li>
  );
};
