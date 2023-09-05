'use client';

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuViewport,
} from '@/components/ui/navigation-menu';

export default function Navigation() {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>About</NavigationMenuTrigger>
					<NavigationMenuContent>
						<div className="grid w-96 grid-cols-2">
							<NavigationMenuLink
								className="col-span-1 h-full w-full p-2"
								href="https://github.com/abishekdevendran/VerbaTrack"
							>
								<div className="from-muted/50 to-muted flex h-full w-full items-end justify-center rounded-md bg-gradient-to-b p-6 no-underline outline-none focus:shadow-md">
									<span>Help me out at Github.</span>
								</div>
							</NavigationMenuLink>
							<ul className="col-span-1 w-full p-2">
								<li className="p-1 hover:underline">Philosophy</li>
								<li className="p-1 hover:underline">Getting Started</li>
								<li className="p-1 hover:underline">Example</li>
							</ul>
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>About</NavigationMenuTrigger>
					<NavigationMenuContent>
						<div className="grid w-96 grid-cols-2">
							<NavigationMenuLink
								className="col-span-1 h-full w-full p-2"
								href="https://github.com/abishekdevendran/VerbaTrack"
							>
								<div className="from-muted/50 to-muted flex h-full w-full items-end justify-center rounded-md bg-gradient-to-b p-6 no-underline outline-none focus:shadow-md">
									<span>Help me out at Github.</span>
								</div>
							</NavigationMenuLink>
							<ul className="col-span-1 w-full p-2">
								<li className="p-1 hover:underline">Philosophy</li>
								<li className="p-1 hover:underline">Getting Started</li>
								<li className="p-1 hover:underline">Example</li>
							</ul>
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
