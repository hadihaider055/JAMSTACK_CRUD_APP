export type User = {
  title: string;
  description: string;
  id: number;
};

export type GetDataProps = {
  data: Object[];
  handleDelete: Function;
  handleEdit: Function;
};
