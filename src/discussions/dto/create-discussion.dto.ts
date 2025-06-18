export interface CreateDiscussionDto {
  name: string,
  creatorId: number,
  memberIds?: number[]; 
}
