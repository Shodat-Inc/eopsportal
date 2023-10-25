
interface Tag {
  tagName: string;
  dataTypeId: number;
  classId: number;
}
export interface CreateClass {
  className: string;
  parentId?: number;
  parentJoinKey:any[];
  userId: number;
  tags: Tag[];
}
