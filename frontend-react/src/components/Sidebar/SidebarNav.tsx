import { Stack } from "@chakra-ui/react";
import {
  RiStackFill,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
} from "react-icons/ri";

import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Stack spacing="12" alignItems="flex-start">
      <NavSection title="General">
        <NavLink icon={RiDashboardLine} href="/">
          Dashboard
        </NavLink>
        <NavLink icon={RiStackFill} href="/combination/edit">
          Edit combination
        </NavLink>
      </NavSection>

      {/* <NavSection title="Automação">
        <NavLink icon={RiInputMethodLine} href="/forms">
          Formulários
        </NavLink>
        <NavLink icon={RiGitMergeLine} href="/automation">
          Automação
        </NavLink>
      </NavSection> */}
    </Stack>
  );
}
