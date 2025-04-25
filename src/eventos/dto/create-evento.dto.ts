export class CreateEventoDto {
    title: string;
    startTime: Date;
    endTime: Date;
    NumberDocument: string;
    fileDocument?: string;
    description: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    dni: string;
    salaId: number;
    creatorId: number;
  }