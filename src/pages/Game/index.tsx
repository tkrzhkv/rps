import { useSocket } from "hooks/useSocket";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { Button } from "shared/ui/button.style";
import { ControlledInput } from "shared/ui/Input";
import { currentUserAtom, opponentUserAtom } from "state/user";
import { ElementType } from "types/gameTypes";
import { ButtonContainer, Container, FormValues, LeaveGameContainer, ResultContainer } from "./ui";

export const Game: FC = () => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
  const opponentUser = useRecoilValue(opponentUserAtom);

  const handleElementChoice = (element: ElementType) => sendSymbol(element);

  const { sendSymbol, opponentChoice, result, selected, onRefresh, score, onLeave } = useSocket(
    currentUser.username
  );

  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      username: currentUser.username,
    },
  });

  const onSubmit = (data: FormValues) => setCurrentUser({ username: data.username });

  return (
    <Container>
      {currentUser && opponentUser && (
        <>
          <p>YOU - {score.currentPlayerPoints}</p>
          <p>OPPONENT - {score.opponentPlayerPoints}</p>
        </>
      )}
      {currentUser.username === "" ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <ControlledInput
            control={control}
            name='username'
            label='Enter your username'
            rules={{ required: true }}
          />
          <Button type='submit'>Enter</Button>
        </form>
      ) : (
        <>
          <p>You - {currentUser.username}</p>
          <p>
            Opponent -
            {opponentUser.username === "" ? "Waiting for opponent..." : opponentUser.username}
          </p>
          <p>{opponentChoice ? "Opponent made choice" : "Waiting for opponent choice..."}</p>
          {!result.length && (
            <ButtonContainer>
              <Button
                onClick={() => handleElementChoice("rock")}
                isActive={selected === "rock"}
              >
                Rock
              </Button>
              <Button
                onClick={() => handleElementChoice("paper")}
                isActive={selected === "paper"}
              >
                Paper
              </Button>
              <Button
                onClick={() => handleElementChoice("scissors")}
                isActive={selected === "scissors"}
              >
                Scissors
              </Button>
            </ButtonContainer>
          )}
          {Boolean(result.length) && (
            <div>
              <Button onClick={onRefresh}>Restart Game</Button>
            </div>
          )}
          {Boolean(result.length) && <ResultContainer>Result: {result}</ResultContainer>}
        </>
      )}
      {currentUser.username !== "" && (
        <LeaveGameContainer>
          <Button onClick={onLeave}>Leave this Game</Button>
        </LeaveGameContainer>
      )}
    </Container>
  );
};
