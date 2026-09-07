import Image from "next/image";

type OperatorMarkData = {
  markUrl: string;
  name: string;
};

export default function OperatorMark({
  operator,
  className = "",
}: {
  operator: OperatorMarkData;
  className?: string;
}) {
  return (
    <div
      className={`relative h-28 w-28 shrink-0 overflow-hidden rounded-full bg-[#F6F7F7] ${className}`}
    >
      <Image
        src={operator.markUrl}
        alt={`${operator.name} profile`}
        fill
        sizes="112px"
        className="object-cover"
      />
    </div>
  );
}
