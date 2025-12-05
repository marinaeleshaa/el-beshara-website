export interface IServiceStat {
  label: string;
  value: string;
}

export interface IServiceAction {
  text: string;
  href: string;
}

export interface IPoints{
  label: string;
  icon: React.ReactNode
}

export interface IService {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  points: IPoints[];
  statistics: IServiceStat[];
  action: IServiceAction;
}
