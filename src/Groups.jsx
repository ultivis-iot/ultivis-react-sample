import { Outlet } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  FallbackUi,
  LazyLoader,
  Loading,
  MenuBar,
  TabItem,
  useApi,
  useRouting,
  useTranslation,
  useInventoryContext,
  DashboardIcon,
  AlarmIcon,
  NavigationIcon,
} from "@ultivis-iot/react";

const Groups = () => {
  const { t } = useTranslation();
  const { getDashboards } = useApi();
  const { sourceId, category } = useRouting();
  const device = useInventoryContext(sourceId);

  const { data: dashboards } = useSuspenseQuery({
    queryKey: ["dashboards", sourceId],
    staleTime: Infinity,
    queryFn: async () => await getDashboards(sourceId, category, device.type),
    select: (res) =>
      res.sort(
        (a, b) =>
          b["u5s_Dashboard"]["priority"] - a["u5s_Dashboard"]["priority"]
      ),
  });

  return (
    <>
      <MenuBar
        context={true}
        tabItems={
          <>
            {dashboards.map(({ id, name, icon }) => (
              <TabItem
                key={id}
                to={`dashboard/${id}`}
                label={name}
                icon={icon ?? DashboardIcon}
              />
            ))}
            <TabItem to="alarms" label={t("Alarms")} icon={AlarmIcon} />
            {category !== "group" && (
              <TabItem
                to="location"
                label={t("Location")}
                icon={NavigationIcon}
              />
            )}
          </>
        }
      />
      <FallbackUi>
        <LazyLoader
          fallback={
            <div className="flex items-center justify-center">
              <Loading />
            </div>
          }
        >
          {/* 탭 콘텐츠 */}
          <Outlet />
        </LazyLoader>
      </FallbackUi>
    </>
  );
};

export default Groups;
