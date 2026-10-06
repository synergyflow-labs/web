# Application Layout (`src/app/core/layout`)

This directory provides the top-level structural layout framing authenticated views.

## Components in this Directory

* **`BaseLayout` (`base-layout/`)**: Master shell containing the responsive layout orchestration. Leverages `@angular/cdk/layout` (`BreakpointObserver`) and signals to automatically adapt between a fixed desktop sidebar and a mobile slide-out drawer with backdrop.
* **`TopBar` (`top-bar/`)**: Header bar containing sidebar toggle, dynamic breadcrumbs, language selector dropdown, and current authenticated user avatar/logout button.
* **`SideBar` (`sidebar/`)**: Collapsible navigation drawer featuring brand logo and main route links.

## CSS Architecture

The layout relies on **CSS Logical Properties** (`margin-inline-start`, `padding-block`, `inset-inline-start`) guaranteeing instant, zero-recalculation RTL/LTR bidirectional support.
