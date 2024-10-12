import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { User2Icon } from 'lucide-react';

export const UserMenu = () => (
  <Menu as="div" className="relative">
    <MenuButton className="relative flex rounded-full">
      <User2Icon />
    </MenuButton>
    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5">
      <MenuItem>
        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
          Perfil
        </a>
      </MenuItem>
      <MenuItem>
        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
          Cerrar Sesión
        </a>
      </MenuItem>
    </MenuItems>
  </Menu>
);
