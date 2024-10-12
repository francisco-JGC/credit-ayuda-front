import { Dialog, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import { reports } from './data';
import { Logo } from './Logo';
import { UserMenu } from './UserMenu';

export const MobileNav = ({ open, onClose }: { open: boolean; onClose: () => void }) => (
  <Dialog open={open} onClose={onClose} className="lg:hidden">
    <div className="fixed inset-0 z-10" />
    <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full bg-white sm:max-w-sm">
      <div className="flex items-center justify-between p-6">
        <Logo />
        <button onClick={onClose} className="-m-2.5 p-2.5 text-gray-700">
          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div className="mt-6 flow-root">
        <div className="-my-6 divide-y divide-gray-500/10">
          <div className="space-y-2 py-6">
            <Disclosure>
              <DisclosureButton className="flex w-full items-center justify-between px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">
                Product
                <ChevronDownIcon className="h-5 w-5" />
              </DisclosureButton>
              <DisclosurePanel>
                {[...reports].map((item) => (
                  <Link key={item.name} to={item.href} className="block px-6 py-2 text-gray-900 hover:bg-gray-50">
                    {item.name}
                  </Link>
                ))}
              </DisclosurePanel>
            </Disclosure>
            <Link to="#" className="block px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
              Features
            </Link>
            <Link to="#" className="block px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
              Marketplace
            </Link>
            <Link to="#" className="block px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
              Company
            </Link>
          </div>
          <div className="py-6">
            <UserMenu />
          </div>
        </div>
      </div>
    </Dialog.Panel>
  </Dialog>
);
