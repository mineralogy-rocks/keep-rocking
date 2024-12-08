import { Metadata } from 'next';

import Home from './index';


export const metadata: Metadata = {
  title: 'mineralogy.rocks',
  description: 'Welcome to mineralogy.rocks - a resource for mineral computing and mineral informatics',
}

export default function Page() {
  return <Home />
}
