'use client';

import { useState } from 'react';

import Link from 'next/link';

import { Github, Menu, X } from 'lucide-react';

import { Env } from '@/env';
import { ButtonLink } from '@/global/components/button-link';

import { Button } from '$/components/ui/button';
import { cn } from '$/lib/utils';

const navLinks = [
  { href: '#how-it-works', label: 'How it works' },
  { href: Env.GithubUrl, label: 'GitHub', external: true, icon: Github },
] as const;

export const HeaderNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="hidden items-center gap-4 md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            {...('external' in link && link.external
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
            className="text-muted-foreground hover:text-foreground flex
              items-center gap-1 transition-colors"
          >
            {'icon' in link && link.icon ? (
              <link.icon className="h-4 w-4" />
            ) : null}
            {link.label}
          </Link>
        ))}

        <ButtonLink href="#get-started">Create your page</ButtonLink>
      </nav>

      <div className="md:hidden">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>

        <div
          className={cn(
            'glass-inset absolute top-full right-0 left-0 border-t',
            'border-glass-border px-4 py-4',
            open ? 'block' : 'hidden'
          )}
        >
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                {...('external' in link && link.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="text-muted-foreground hover:text-foreground flex
                  items-center gap-2 py-1 transition-colors"
                onClick={() => setOpen(false)}
              >
                {'icon' in link && link.icon ? (
                  <link.icon className="h-4 w-4" />
                ) : null}
                {link.label}
              </Link>
            ))}

            <ButtonLink
              href="#get-started"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              Create your page
            </ButtonLink>
          </nav>
        </div>
      </div>
    </>
  );
};
