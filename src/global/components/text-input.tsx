import { Info } from 'lucide-react';
import { useController, useFormContext } from 'react-hook-form';

import { Input } from '$/components/ui/input';
import { Label } from '$/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '$/components/ui/tooltip';

type Props = React.ComponentProps<'input'> & {
  name: string;
  label?: string;
  description?: string;
  info?: React.ReactNode;
};

export const TextInput = ({ label, description, info, ...props }: Props) => {
  const form = useFormContext();
  const control = useController({ name: props.name, control: form.control });

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={props.name}>
          {label}

          <Tooltip>
            <TooltipTrigger asChild disabled={!info}>
              <Info className="size-3" />
            </TooltipTrigger>
            <TooltipContent>{info}</TooltipContent>
          </Tooltip>
        </Label>
      )}

      <Input
        {...props}
        {...form.register(props.name)}
        aria-invalid={!!form.formState.errors[props.name]}
      />

      {control.fieldState.error ? (
        <p className="text-destructive text-sm">
          {control.fieldState.error.message}
        </p>
      ) : description ? (
        <p className="text-muted-foreground text-sm">{description}</p>
      ) : null}
    </div>
  );
};
