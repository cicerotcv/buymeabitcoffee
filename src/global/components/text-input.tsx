import { useFormContext } from 'react-hook-form';

import { Input } from '$/components/ui/input';

type Props = React.ComponentProps<'input'> & {
  name: string;
};

export const TextInput = (props: Props) => {
  const form = useFormContext();

  return (
    <Input
      {...props}
      {...form.register(props.name)}
      aria-invalid={!!form.formState.errors[props.name]}
    />
  );
};
