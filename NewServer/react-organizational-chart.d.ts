declare module 'react-organizational-chart' {
    import { ReactNode, ComponentType } from 'react';
  
    interface OrganizationalChartProps {
      label: ReactNode;
      lineHeight?: string;
      lineWidth?: string;
      lineColor?: string;
      nodePadding?: string;
      nodeBorderRadius?: string;
    }
  
    export const OrganizationalChart: ComponentType<OrganizationalChartProps>;
  }
  