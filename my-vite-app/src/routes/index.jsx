import * as Pages from "../pages";
import { paths } from "../config";

const routes = [
  //ứng với mỗi phần tử là 1 link
  {
    path: paths.dashboard, //đường link
    component: Pages.Dashboard, //dữ liệu
  },
  {
    path: paths.evista, //đường link
    component: Pages.Evista, //dữ liệu
  },
  {
    path: paths.status, //đường link
    component: Pages.Status, //dữ liệu
  },
  {
    path: paths.food, //đường link
    component: Pages.Food, //dữ liệu
  },
  {
    path: paths.alarm, //đường link
    component: Pages.Alarm, //dữ liệu
  },
  {
    path: paths.harvest, //đường link
    component: Pages.Harvest, //dữ liệu
  },
  {
    path: paths.access, //đường link
    component: Pages.Access, //dữ liệu
  },
  {
    path: paths.farm, //đường link
    component: Pages.Farm, //dữ liệu
  },
  {
    path: paths.transfer, //đường link
    component: Pages.Transfer, //dữ liệu
  },
  {
    path: paths.machinesmanager, //đường link
    component: Pages.MachinesManager, //dữ liệu
  },
  {
    path: paths.shrimpmanagement, //đường link
    component: Pages.ShrimpManagement, //dữ liệu
  },
  {
    path: paths.info, //đường link
    component: Pages.Info, //dữ liệu
  },
  {
    path: paths.account, //đường link
    component: Pages.Logout, //dữ liệu
  },
];

export default routes;
