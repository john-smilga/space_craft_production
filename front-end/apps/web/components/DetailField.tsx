type DetailFieldProps = {
  label: string;
  value: string | React.ReactNode;
  valueClassName?: string;
}

export default function DetailField({ label, value, valueClassName = '' }: DetailFieldProps) {
  return (
    <div>
      <label className='text-xs font-medium text-muted-foreground'>{label}</label>
      <p className={`text-sm text-foreground mt-1 ${valueClassName}`}>{value}</p>
    </div>
  );
}
