import { Bars3Icon } from '@heroicons/react/24/outline';

export const MobileMenuButton = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
  >
    <span className="sr-only">Open main menu</span>
    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
  </button>
);
