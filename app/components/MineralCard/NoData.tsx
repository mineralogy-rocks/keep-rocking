import Chip from '@/components/Chip';


export default function NoData() {
  return (
    <div className="flex cursor-default">
      <Chip type="na" className="">
        <span className="font-normal text-xs">No Data</span>
      </Chip>
    </div>
  );
};
