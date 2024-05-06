import { Skeleton } from 'moti/skeleton';
import React from 'react';
import { Spacer } from './Spacer';

export const LanguagesSkeleton = () => {
  return Array.from({ length: 10 }).map((_, index) => (
    <>
      <Skeleton key={index} colorMode="light" width={50} height={10} />
      <Spacer height={5} />
    </>
  ));
};
