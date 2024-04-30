import { useRef } from "react";

import {
  Camera,
  FaceDetection,
  Webcam,
  useFaceDetection,
} from "@/hooks/useFaceDetection";

const FaceDetectionCamera = () => {
  const camWidth = 720;
  const camHeight = 480;
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
        width: camWidth,
        height: camHeight,
        facingMode: "user",
      }),
  });
  const canvasRef = useRef(null);

  function handleOnFaceDetected(res) {
    const { image, detections, multiFaceLandmarks } = res;
    console.log("face detections", detections);
    const video = webcamRef.current.video;
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    // Set canvas width
    const canvasWidth = 320;
    const canvasHeight = 180;
    canvasRef.current.height = (canvasRef.current.width / 16) * 9;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");

    if (detections.length > 0) {
      const detection = detections[0];
      const normalizedBoundingBox = detection.boundingBox;
      const width = canvasRef.current.width;
      const height = (width / 16) * 9;
      // const width = normalizedBoundingBox.width * videoWidth;
      // const height = normalizedBoundingBox.height * videoHeight;
      const xCenter = normalizedBoundingBox.xCenter * videoWidth;
      const yCenter = normalizedBoundingBox.yCenter * videoHeight;

      // Mở rộng kích thước và điều chỉnh tọa độ
      const expandedWidth = width + 50; // Thêm 100px mỗi bên
      const expandedHeight = height + 50;

      let sx = xCenter - expandedWidth / 2;
      let sy = yCenter - expandedHeight / 2 - 50;
      if (sx < 0) {
        sx = 0;
      }
      if (sy < 0) {
        sy = 0;
      }

      if (sx + 50 > expandedHeight) {
        sx = height - 50;
      }

      if (sy + 50 > expandedWidth) {
        sy = width - 50;
      }

      // Xóa và vẽ lại canvas
      canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Vẽ hình ảnh phù hợp với khung nhận diện
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
      canvasCtx.drawImage(image, 0, 0, 320, 180);
    }
  }

  return (
    <>
      <Webcam
        ref={webcamRef}
        style={{
          width: camWidth,
          height: camHeight,
        }}
        className="hidden"
      />
      <canvas ref={canvasRef} className="w-full" />
    </>
  );
};

export default FaceDetectionCamera;
