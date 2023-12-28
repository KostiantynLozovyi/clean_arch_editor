export class SerializedObjectDTO {
	__kind!: string;
	id!: number;
	parentId?: number | null;
	content: any;
}
