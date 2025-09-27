export interface AuditLog {
  id: number;
  actorId: string;
  actorEmail: string;
  action: string;
  metadata?: any;
  createdAt: Date | string; 
}

