import { useRef } from 'react';
import { useAsync } from 'react-use';
import styled from 'styled-components';

import { getImageUrl } from '../../../lib/image/getImageUrl';

const _Canvas = styled.canvas`
  height: 100%;
  width: auto;
  flex-grow: 0;
  flex-shrink: 0;
`;

type Props = {
  onLoaded: () => void;
  pageImageId: string;
};

export const ComicViewerPage = ({ onLoaded, pageImageId }: Props) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useAsync(async () => {
    const image = new Image();
    image.src = getImageUrl({
      format: 'jpg',
      imageId: pageImageId,
    });
    await image.decode();

    const canvas = ref.current!;
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const ctx = canvas.getContext('2d')!;

    const { decrypt } = await import('@wsh-2024/image-encrypt/src/decrypt');
    decrypt({
      exportCanvasContext: ctx,
      sourceImage: image,
      sourceImageInfo: {
        height: image.naturalHeight,
        width: image.naturalWidth,
      },
    });

    canvas.setAttribute('role', 'img');

    onLoaded();
  }, [pageImageId]);

  return <_Canvas ref={ref} />;
};
