interface ErrorSpanProps {
  text: string;
}

const ErrorSpan: React.FC<ErrorSpanProps> = ({text}) => {
  return (
    <span className="text-red-500 text-sm w-full ml-1 max-w-[280px]">{text}</span>
  )
};

export { ErrorSpan };