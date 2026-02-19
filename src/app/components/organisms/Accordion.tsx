import { Colors, Typography } from "@Coronation-ArchTouch/cor-ui";
import { Icon } from "@Coronation-ArchTouch/cor-ui-icons";
import { useState } from "react";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  variant?: "compact" | "separate";
  index?: number;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  index,
  title,
  children,
  variant = "compact",
}) => {
  const [isOpen, setIsOpen] = useState(index === 0);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <button
        className="w-full p-6 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors border-none cursor-pointer text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Typography
          as="p"
          className="md:!text-[24px] !text-[16px] !font-[500] !text-[#141415] md:!leading-[32px] !leading-[22px]"
        >
          {title}
        </Typography>
        <span className="flex-shrink-0 ml-4 flex items-center justify-center transition-transform">
          <Icon
            icon={isOpen ? "caret-down" : "caret-right"}
            variant="outline"
            color={Colors.primary.gray[600]}
          />
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? "max-h-96 px-6 pb-6" : "max-h-0"
        }`}
      >
        {variant === "separate" ? (
          children
        ) : (
          <Typography
            as="p"
            className="md:!text-[18px] !text-[14px] !font-[400] !text-[#616162] !leading-[28px]"
          >
            {children}
          </Typography>
        )}
      </div>
    </div>
  );
};

interface AccordionProps {
  items: {
    title: string;
    content: React.ReactNode;
  }[];
  variant?: "compact" | "separate";
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  variant = "compact",
}) => {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item, index) => (
        <AccordionItem
          index={index}
          key={index}
          title={item.title}
          variant={variant}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;
