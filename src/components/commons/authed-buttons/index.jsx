import React from 'react';
import { useSelector } from 'react-redux';

import { IfFirebaseAuthed, IfFirebaseUnAuthed } from '../../../core/firebase';
import { isOwner } from '../../../helpers';
import { selectParcours } from '../../../redux/selectors';
import BigButton from './big-button';
import CommitButton from './commit-button';
import EditButton from './edit-button';

const SidebarAuthedComponent = React.memo(function SidebarAuthedComponent() {
  const parcours = useSelector(selectParcours);
  const createmode = useSelector(_ => _.createmode);
  return (
    <React.Fragment>
      <IfFirebaseAuthed>
        {({ user }) => {
          const isowner = isOwner(parcours, user);
          const showcommitbutton = createmode;
          const showeditbutton = parcours && isowner && !createmode;
          const showbigbutton = !showcommitbutton && !showeditbutton;
          return (
            <React.Fragment>
              {showeditbutton && <EditButton />}
              {showcommitbutton && <CommitButton />}
              {showbigbutton && <BigButton user={user} />}
            </React.Fragment>
          );
        }}
      </IfFirebaseAuthed>
      <IfFirebaseUnAuthed>
        <span />
      </IfFirebaseUnAuthed>
    </React.Fragment>
  );
});

export default SidebarAuthedComponent;
