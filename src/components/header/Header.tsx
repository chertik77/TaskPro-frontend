import { HeaderThemeSelect } from "./HeaderThemeSelect";
import { HeaderUserBar } from "./HeaderUserBar";

export const Header = () => {
  return (
    <div className="flex justify-end fixed top-0 w-full z-5 bg-headerBgColor p-20 gap-14 md:justify-center">
      <HeaderThemeSelect />
      <HeaderUserBar />
    </div>
  );
};

