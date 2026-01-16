import { JSX } from "react";

export interface IServiceStat {
  label: string;
  value: string;
}

export interface IServiceBtn {
  text: string;
  href: string;
}

export interface IPoints{
  label: string;
  icon: string | JSX.Element;
}

export interface IService {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  points: IPoints[];
  statistics: IServiceStat[];
  action?: IServiceBtn;
  toContact: IServiceBtn;
}

export interface MenuItem {
  title: string;
  url: string;
}