import * as React from "react";
import { MemberEntity } from "../../model/member";
import { memberAPI } from "../../api/memberAPI";
import { MemberRow } from "./memberRow";
import { MemberHead } from "./memberHead";
import { useState } from "react";

interface Props {}

export const MembersTableComponent = (props: Props) => {
  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  //Create a new entry on the state with the current organization name (lemoncode by default).
  const [organizationName, setorganizationName] = useState("lemoncode");

  //Retrieve the name of the organization from the state before running the query.
  const loadMembers = (organizationName: string) => {
    memberAPI
      .getAllMembers(organizationName)
      .then(members => setMembers(members));
  };

  return (
    <div className="row">
      <h2> Members Page</h2>
      {/*  Create an input to hold the organization member name. */}
      <div>
        Organization:
        <input
          type="text"
          value={organizationName}
          /*  Tie up on change to the organization state change. */
          onChange={event => setorganizationName(event.target.value)}
        />
      </div>
      <button onClick={() => loadMembers(organizationName)}>Load</button>
      <table className="table">
        <thead>
          <MemberHead />
        </thead>
        <tbody>
          {members.map((member: MemberEntity) => (
            <MemberRow key={member.id} member={member} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
