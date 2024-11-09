
export const general_meta = ({ data }: { data?: { meta?: string[] } }) => {
  return data?.meta ?? [];
};