// @ts-nocheck
import React, { forwardRef, useRef, useState } from "react";

import {
  Camera,
  FaceDetection,
  Webcam,
  useFaceDetection,
} from "@/hooks/useFaceDetection";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface CameraProps {
  setPlayerState: (any) => void;
  ref?: any;
}

const FaceDetectionCamera: React.FC<CameraProps> = forwardRef((props, ref) => {
  const { setPlayerState } = props;
  const timerRef = ref;
  const [open, setOpen] = useState<boolean>(false);

  const { webcamRef } = useFaceDetection({
    handleOnFaceDetected,
    faceDetectionOptions: {
      model: "short",
      selfieMode: false,
      minDetectionConfidence: 0.7,
    },
    faceDetection: new FaceDetection({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
    }),
    camera: ({ mediaSrc, onFrame }) =>
      new Camera(mediaSrc, {
        onFrame,
        facingMode: "user",
      }),
  });
  const canvasRef = useRef(null);

  function handleOnFaceDetected(res) {
    const { image, detections, multiFaceLandmarks } = res;
    canvasRef.current.height = (canvasRef.current.width / 16) * 9;

    // console.log("face detections", detections);
    const video = webcamRef.current.video;
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    // Set canvas width
    const canvasWidth = 320;
    const canvasHeight = 180;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");

    // clear canvas to redraw
    canvasCtx.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height,
    );

    if (detections.length > 0) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      // boundingBox: {
      //     "xCenter": 0.5643358826637268,
      //     "yCenter": 0.7879878282546997,
      //     "height": 0.3488408923149109,
      //     "width": 0.261630654335022, ...
      // }
      const normalizedBoundingBox = detections[0].boundingBox;
      const width = canvasRef.current.width; //
      const height = (width / 16) * 9;
      const xCenter = normalizedBoundingBox.xCenter * videoWidth;
      const yCenter = normalizedBoundingBox.yCenter * videoHeight;

      // Mở rộng kích thước và điều chỉnh tọa độ
      const expandedWidth = width + 50; // Thêm 100px mỗi bên
      const expandedHeight = height + 50;

      let sx = xCenter - expandedWidth / 2;
      let sy = yCenter - expandedHeight / 2 - 50;
      // when source x < 0 then set source x to 0
      if (sx < 0) {
        sx = 0;
      }
      if (sy < 0) {
        sy = 0;
      }

      if (sx + expandedHeight > videoHeight) {
        sx = height - 50;
      }
      if (sy + expandedWidth > videoWidth) {
        sy = width - 50;
      }

      // draw image (face) to canvas
      canvasCtx.drawImage(
        image,
        sx,
        sy,
        expandedWidth,
        expandedHeight,
        0,
        0,
        canvasWidth,
        canvasHeight,
      );
    } else {
      if (!timerRef.current) {
        timerRef.current = setTimeout(() => {
          setPlayerState((prev) => ({ ...prev, playing: false }));
          setOpen(true);
        }, 2000);
      }
      canvasCtx.drawImage(image, 0, 0, 320, 180);
    }
  }

  const handleContinue = () => {
    setOpen((prev) => false);
    setPlayerState((prev) => ({ ...prev, playing: true }));
    if (timerRef.current) timerRef.current = null;
  };

  return (
    <>
      <Webcam ref={webcamRef} className="hidden" />
      <canvas ref={canvasRef} className="w-full" />
      <Dialog open={open}>
        <DialogContent
          className="text-black dark:text-white sm:max-w-[425px]"
          onInteractOutside={handleContinue}
          hideCloseButton={true}
        >
          <DialogHeader>
            <DialogTitle>Warning</DialogTitle>
            <DialogDescription>
              You have been absent for a while. When you want to continue, click
              on button below or outside this popup .
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleContinue}>OK. I'm ready to continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
});

export default FaceDetectionCamera;
