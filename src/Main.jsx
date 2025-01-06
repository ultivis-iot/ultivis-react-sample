import {
  Layout,
  SidebarItem,
  useTranslation,
  HomeIcon,
} from "@ultivis/library";

const Main = () => {
  const { t } = useTranslation();
  // 페이지 제목
  const pageTitle = () => {
    return t("home");
  };

  return (
    <Layout
      pageTitle={pageTitle}
      sidebarItems={
        <>
          <SidebarItem
            icon={HomeIcon}
            label={t("Home")}
            to="/"
            className="p-3 dark:text-dark-grayscale-100"
          />
        </>
      }
    />
  );
};

export default Main;
