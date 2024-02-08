import { valibotResolver } from '@hookform/resolvers/valibot';
import { NeedHelpModal, needHelpSchema } from '../lib/schemas/needHelpModal-schema';
import { useForm } from 'react-hook-form';

export const useNeedHelp = () => {
  const {
    register,
    formState: { errors }
  } = useForm<NeedHelpModal>({
    resolver: valibotResolver(needHelpSchema),
    mode: 'onChange'
  });

  return { register, errors };
};
