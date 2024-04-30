import { Camera } from "@mediapipe/camera_utils";
import { FaceDetection } from "@mediapipe/face_detection";
import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

/**
 * Face detection hook component
 *
 */
function useFaceDetection({
  handleOnFaceDetected,
  faceDetectionOptions: options,
  faceDetection: faceDetectionInitializer,
  camera,
}) {
  const [cameraManager, setCameraManager] = useState();

  const webcamRef = useRef(null);
  const faceDetection = useRef(faceDetectionInitializer).current;

  /**
   * Handles face detection
   *
   * @param {HTMLVideoElement} mediaSrc Current media source
   */
  const handleFaceDetection = useCallback(() => {
    faceDetection.setOptions({
      ...options,
    });

    faceDetection.onResults(handleOnFaceDetected);
  }, [handleOnFaceDetected]);

  useEffect(() => {
    if (!webcamRef.current || !webcamRef.current.video || !camera) return;

    const mediaSrc = webcamRef.current.video;
    setCameraManager(() =>
      camera({
        mediaSrc,
        width: mediaSrc.videoWidth,
        height: mediaSrc.videoHeight,
        onFrame: async () => {
          await faceDetection.send({
            image: mediaSrc,
          });
        },
      }),
    );
  }, []);

  useEffect(() => {
    handleFaceDetection();
  }, [handleFaceDetection, handleOnFaceDetected]);

  useEffect(() => {
    cameraManager?.start();

    // stops camera detection when component unmounts
    return () => {
      cameraManager?.stop();
    };
  }, [cameraManager]);

  return { webcamRef };
}

export { Camera, FaceDetection, Webcam, useFaceDetection };
