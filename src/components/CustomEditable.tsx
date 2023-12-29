import {
  Collapse,
  Editable,
  EditableInput,
  EditablePreview,
  EditableProps,
  EditableTextarea,
  Stack,
  Text,
} from '@chakra-ui/react';
import { observer } from '@legendapp/state/react';
import { useEffect, useState } from 'react';

interface EditableInputProps extends EditableProps {
  isTextarea?: boolean;
  label?: string;
}

const CustomEditable = observer(
  ({ isTextarea, label, ...props }: EditableInputProps) => {
    const color = !props.value
      ? props['aria-required']
        ? 'red.500'
        : 'gray.500'
      : undefined;
    const fontSize: EditableProps['fontSize'] = props.fontSize ?? 'x-large';

    const [showLabel, setShowLabel] = useState<boolean>(false);
    useEffect(() => {
      setShowLabel(!!label && !!props.value);
    }, [label, props.value]);

    return (
      <Stack spacing={0}>
        {label && (
          <Collapse in={showLabel} animateOpacity>
            <Text fontSize="sm" mb={2} color="gray.500">
              {label}
            </Text>
          </Collapse>
        )}
        <Editable
          color={color}
          placeholder={label ?? props.placeholder}
          fontSize={fontSize}
          {...props}
        >
          <EditablePreview fontSize={fontSize} />
          {isTextarea ? (
            <EditableTextarea fontSize={fontSize} />
          ) : (
            <EditableInput />
          )}
        </Editable>
      </Stack>
    );
  },
);

export default CustomEditable;
