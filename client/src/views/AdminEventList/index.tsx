import { Classes, H2 } from '@blueprintjs/core';
import { useFleurContext, useStore } from '@fleur/react';
import React from 'react';
import { Container } from '../../components/Container';
import { AdminEventsOps } from '../../features/admin-events';
import { AuthStore } from '../../features/auth';

export const AdminEventList = () => {
  const { executeOperation } = useFleurContext();
  const userId = useStore(getStore => getStore(AuthStore).state.userId);
  const isAdmin = useStore(getStore => getStore(AuthStore).state.isAdmin);

  React.useEffect(() => {
    if (!userId) return;
    executeOperation(
      AdminEventsOps.getEventList,
      isAdmin ? undefined : userId,
      50,
    );
  }, []);
  return (
    <Container>
      <H2 className={Classes.HEADING}>イベント一覧</H2>
    </Container>
  );
};
